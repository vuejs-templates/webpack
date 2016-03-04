// Polyfill fn.bind() for PhantomJS
/* eslint-disable no-extend-native */
Function.prototype.bind = require('function-bind')

// require all test files (files that ends with .spec.js)
var testsContext = require.context('.', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// you can require all the js files from src to include empty coverages too
// This is an example where we want to include our services in coverage reports
// var servicesContext = require.context('../../src/services/', true)
// servicesContext.keys().forEach(servicesContext)
// This other example includes everything
// var sourceContext = require.context('../../src', true)
// sourceContext.keys().forEach(sourceContext)
