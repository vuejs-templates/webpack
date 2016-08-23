const path          = require('path')
const express       = require('express')
const webpack       = require('webpack')
const ora           = require('ora')
const config        = require('../config')
//var proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.test.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
//var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
//var proxyTable = config.dev.proxyTable

const spinner = process.env.NODE_ENV === 'testing' ? ora('building for testing...') : ora('building for development...')
spinner.start()

//var app = express()
webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
      colors      : true,
      modules     : false,
      children    : false,
      chunks      : false,
      chunkModules: false
    }) + '\n')
})

// proxy api requests
/*Object.keys(proxyTable).forEach(function (context) {
 var options = proxyTable[context]
 if (typeof options === 'string') {
 options = { target: options }
 }
 app.use(proxyMiddleware(context, options))
 })*/

// handle fallback for HTML5 history API
// app.use(require('connect-history-api-fallback')())
