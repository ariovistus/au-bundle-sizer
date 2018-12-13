this is a script to summarize the sizes of scripts bundled by requirejs.

I use it on minified bundles produced by aurelia-cli. It might work with other things.

Usage: 

```
au-bundle-sizer vendor-bundle.js

```

it will produce output similar to

```
aurelia-bootstrap 57900
   text!aurelia-bootstrap/typeahead/aubs-typeahead.html 2106
   text!aurelia-bootstrap/tabs/aubs-tabset.html 618
   text!aurelia-bootstrap/tabs/aubs-tab.html 190
   text!aurelia-bootstrap/pagination/aubs-pagination.html 1936
   aurelia-bootstrap/index 3175
   aurelia-bootstrap 77
   text!aurelia-bootstrap/accordion/aubs-accordion.html 252
   text!aurelia-bootstrap/accordion/aubs-accordion-group.html 970
   aurelia-bootstrap/utils/tooltip-service 1548
   aurelia-bootstrap/utils/bootstrap-options 633
   aurelia-bootstrap/utils/bootstrap-config 352
   aurelia-bootstrap/typeahead/typeahead-highlight 573
   aurelia-bootstrap/typeahead/aubs-typeahead 8765
   aurelia-bootstrap/tooltip/aubs-tooltip 4927
   aurelia-bootstrap/tabs/aubs-tabset 2358
   aurelia-bootstrap/tabs/aubs-tab 2133
   aurelia-bootstrap/popover/aubs-popover 6203
   aurelia-bootstrap/pagination/aubs-pagination 4248
   aurelia-bootstrap/dropdown/aubs-dropdown 2955
   aurelia-bootstrap/dropdown/aubs-dropdown-toggle 769
   aurelia-bootstrap/collapse/aubs-collapse 1659
   aurelia-bootstrap/buttons/aubs-btn-radio 2101
   aurelia-bootstrap/buttons/aubs-btn-loading 2325
   aurelia-bootstrap/buttons/aubs-btn-checkbox 2448
   aurelia-bootstrap/accordion/aubs-accordion 2071
   aurelia-bootstrap/accordion/aubs-accordion-group 2508
aurelia-templating 76840
   aurelia-templating 76840
aurelia-binding 94038
   aurelia-binding 94038
bootstrap 182823
   text!bootstrap/dist/css/bootstrap.css 182788
   bootstrap 35
d3v4 209857
   d3v4/build/d3 209803
   d3v4 54
zxing 1291841
   zxing/zxing 1291788
   zxing 53
total size:  2518242
```
