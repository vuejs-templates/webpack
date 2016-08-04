const path        = require('path')
const express     = require('express')
const webpack     = require('webpack')
const ora         = require('ora')
const config      = require('../config')
//var proxyMiddleware = require('http-proxy-middleware')
let webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.test.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
//var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
//var proxyTable = config.dev.proxyTable

const spinner = ora('building for production...')
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

/*var devMiddleware = require('webpack-dev-middleware')(compiler, {
 publicPath: webpackConfig.output.publicPath,
 stats: {
 colors: true,
 chunks: false
 }
 })*/

// var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
/*compiler.plugin('compilation', function (compilation) {
 compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
 hotMiddleware.publish({ action: 'reload' })
 cb()
 })
 })*/

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

// serve webpack bundle output
// app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
// app.use(hotMiddleware)

// serve pure static assets
/*var staticPath
 if (process.env.NODE_ENV === 'testing') {
 staticPath = config.test.assetsRoot
 } else {
 staticPath = config.dev.assetsRoot
 }
 app.use(staticPath, express.static('./'))

 module.exports = app.listen(port, function (err) {
 if (err) {
 console.log(err)
 return
 }
 console.log('Listening at http://localhost:' + port + '\n')
 })*/
