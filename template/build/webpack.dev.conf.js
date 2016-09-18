var config = require('../config')
var fs=require('fs')
var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var SvgStore = require('webpack-svgstore-plugin');
var _=require('lodash')
// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

var webpackConfig= merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
  ].concat(generateHtml(config.htmls))
})

var hasSvgFolder=fs.existsSync(path.join(config.alias.assets, './svg'))
if(hasSvgFolder){
  webpackConfig.plugins.push(new SvgStore(
    [
      path.join(config.alias.assets, 'svg', '**/*.svg')
    ],
    //path.join(config.build.assetsRoot,config.build.assetsSubDirectory,'svg'),
    'static/svg',
    {
      name: 'sprite.svg',
      prefix:'',
      baseUrl:'./',
      chunk:'app',
      svgoOptions: {
        plugins: [
          { removeTitle: true }
        ]
      }
    }
  ))
}
function generateHtml(htmlCfgs){
  var htmls=[]
  _.each(htmlCfgs,function(v){
    htmls.push(new HtmlWebpackPlugin(v))
  })
  return htmls;
}
module.exports = webpackConfig