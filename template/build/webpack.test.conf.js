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
    loaders: utils.styleLoaders({sourceMap: config.test.cssSourceMap})
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  watch  : true,
  debug  : true,
  output : {
    path    : config.test.assetsJSRoot,
    //publicPath: config.test.assetsPublicPath,
    filename: '[name].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.test.env
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
    new htmlHashPlugin(Object.assign({
      outputPath: config.test.viewRoot,
      viewPath  : path.resolve(__dirname, '../src/view'),
      index     : ['index.ejs']
    }, mapping.templateMapping)),
    new ExtractTextPlugin('../css/[name].css'),
    new BrowserSyncPlugin({
      serveStatic: [config.test.assetsRoot, config.test.viewRoot]
    })
  ]
});
