const path              = require('path')
const config            = require('../config')
const webpack           = require('webpack')
const merge             = require('webpack-merge')
const utils             = require('./utils')
const baseWebpackConfig = require('./webpack.base.conf')
const htmlHashPlugin    = require('../plugin/html-hash-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BrowserSyncPlugin = require('../plugin/browser-sync-webpack-plugin')
const mapping           = require('../mapping')
//import HtmlWebpackPlugin from 'html-webpack-plugin'

// add hot-reload related code to entry chunks
/*Object.keys(baseWebpackConfig.entry).forEach(function (name) {
 baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
 })*/

module.exports = merge(baseWebpackConfig, {
  module : {
    loaders: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  watch  : true,
  debug  : true,
  output : {
    path    : config.dev.assetsJSRoot,
    //publicPath: config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    //new webpack.optimize.OccurenceOrderPlugin(),
    //new webpack.HotModuleReplacementPlugin(),
    //new webpack.NoErrorsPlugin(),
    /**
     * 在这里引入 manifest 文件
     */
    new webpack.DllReferencePlugin({
      context : __dirname,
      manifest: require('../dll/vendors_manifest.json'),
    }),
    new ExtractTextPlugin('../css/[name].css'),
    new htmlHashPlugin(Object.assign({
      outputPath: config.dev.viewRoot,
      viewPath  : path.resolve(__dirname, '../src/view')
    }, mapping.templateMapping)),
    //
    new BrowserSyncPlugin({
      serveStatic: [config.dev.assetsRoot, config.dev.viewRoot, path.resolve(config.dev.assetsRoot, '../dll/')],
      proxy      : {
        target  : mapping.devProxyTarget || 'localhost:1234',
        proxyRes: [
          function (proxyRes) {
            console.log(proxyRes)
            proxyRes.headers['Content-Type'] = proxyRes.headers['content-type']
          }
        ]
      }
    })
  ]
});
