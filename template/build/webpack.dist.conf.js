var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')

var env = config.dist.env

var webpackConfig = merge(baseWebpackConfig, {
  devtool: config.dist.productionSourceMap ? '#source-map' : false,
  entry: {
    app: './index.js'
  },
  output: {
    path: config.dist.assetsRoot,
    filename: 'index.js',
    libraryTarget: 'umd'
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    })
  ]
})

if (config.dist.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
