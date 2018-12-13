var esprima = require("esprima");
var util = require('util');
var lodash = require("lodash");
var walker = require("estree-walker");
var fs = require("fs");

var data = fs.readFileSync(process.argv[2]);
var result = esprima.parseScript(data.toString(), {range: true});

var modules = new Map();

function size(range) {
    return range[1] - range[0];
}

function searchForCall(expression, strm) {
    if(expression.type == "CallExpression" && expression.callee.type == "FunctionExpression") {
        // function() { ... }(params..) - look in function body for a define("modulename")
        var found = false;
        walker.walk(expression.callee.body, {

            enter: function (node, parent) {
                if(found) {
                    this.skip();
                    return;
                }

                if(isDefineCall(node)) {
                    found = true;
                    processDefineCall(node, expression.range);
                }
            }
        });
    }
}

function isDefineCall(expression) {
    if(expression.type == "CallExpression" && expression.callee.type == "Identifier" && expression.callee.name == "define") {
        return true;
    }
    return false;
}

function processDefineCall(expression, range=null) {
    var moduleName = expression.arguments[0].value;
    if(range == null) {
        range = expression.range;
    }
    modules.set(moduleName, {
        moduleName: moduleName,
        range: range,
        size: size(range),
    });
}
function gotsCallMaybe(expression, strm, range=null) {
    if(range == null) {
        range = expression.range;
    }

    if(isDefineCall(expression)) {
        processDefineCall(expression, range);
        return true;
    }else{
        searchForCall(expression, strm)
    }
}

function isDefinesInIf(stmt) {
    return stmt.type == "IfStatement" && stmt.test.type == "SequenceExpression" && isDefineCall(stmt.test.expressions[0]);
}

function processExpressionSequence(exseq, strm) {
    for(var j = 0; j < exseq.expressions.length; j++) {
        gotsCallMaybe(exseq.expressions[j], strm + " " + j);
    }
}

for(var i = 0; i < result.body.length; i++) {
    if(result.body[i].type == "ExpressionStatement") {
        if(result.body[i].expression.type == "SequenceExpression") {
            processExpressionSequence(result.body[i].expression, ""+i);
        }else{
            gotsCallMaybe(result.body[i], ""+i);
        }
    }else if(isDefinesInIf(result.body[i])){
        processExpressionSequence(result.body[i].test, ""+i);
    }else{
        console.info(i + " " + result.body[i].type + " " + result.body[i].range);
    }
}


var totalSize = size(result.range);
var modulesCombined = new Map();
for(var key of modules.keys()) {
    var path = key;
    if(key.indexOf("!") != -1) {
        path = key.substr(key.indexOf("!")+1);
    }
    var moduleName = path.split("/")[0];
    //console.info(key, " ", path, " ", moduleName);
    if(!modulesCombined.has(moduleName)) {
        modulesCombined.set(moduleName, {
            moduleName: moduleName,
            children: [],
            size: 0,
        });
    }

    modulesCombined.get(moduleName).size += modules.get(key).size;
    modulesCombined.get(moduleName).children.push(modules.get(key));
}

var recs = lodash.sortBy(Array.from(modulesCombined.values()), [function(x) { return x.size }]);

for(var rec of recs) {
    console.info(util.format("%s %s", rec.moduleName, rec.size));
    for(var ch of rec.children) {
        console.info(util.format("   %s %s", ch.moduleName, ch.size));
    }
}

console.info("total size: ", totalSize);
