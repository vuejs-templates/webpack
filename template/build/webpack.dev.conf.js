var config = require('../config')
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

module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new SvgStore(
      [
        path.join(config.alias.assets, 'svg', '**/*.svg')
      ],
      //path.join(config.build.assetsRoot,config.build.assetsSubDirectory,'svg'),
      utils.assetsPath('svg'),
      {
        name: 'sprite.svg',
        prefix:'',
        chunk:'app',
        svgoOptions: {
          plugins: [
            { removeTitle: true }
          ]
        }
      }
    ),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
  ].concat(generateHtml(config.htmls))
})


function generateHtml(htmlCfgs){
  var htmls=[]
  _.each(htmlCfgs,function(v){
    htmls.push(new HtmlWebpackPlugin(v))
  })
  return htmls;
}