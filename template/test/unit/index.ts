import Vue from 'vue'{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
Vue.config.productionTip = false{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}

const crequire = (require as WebpackRequire){{#if_eq tslintConfig "airbnb"}};{{/if_eq}}

// Polyfill fn.bind() for PhantomJS
/* tslint:disable:no-var-requires */
Function.prototype.bind = require('function-bind'){{#if_eq tslintConfig "airbnb"}};{{/if_eq}}

// require all test files (files that ends with .spec.js)
const testsContext = crequire.context('./specs', true, /\.spec$/){{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
testsContext.keys().forEach(testsContext){{#if_eq tslintConfig "airbnb"}};{{/if_eq}}

// require all src files except main.js and *.d.ts for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
const srcContext = crequire.context('../../src', true, /^\.\/(?!(?:main|.*?\.d)(\.ts)?$)/){{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
srcContext.keys().forEach(srcContext){{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
