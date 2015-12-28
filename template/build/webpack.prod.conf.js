var webpack = require('webpack')
var config = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

config.vue.loaders = {
  js: 'babel!eslint',
  // http://vuejs.github.io/vue-loader/configurations/extract-css.html
  css: ExtractTextPlugin.extract('css'),
  less: ExtractTextPlugin.extract('css!less'),
  sass: ExtractTextPlugin.extract('css!sass'),
  stylus: ExtractTextPlugin.extract('css!stylus')
}

// http://vuejs.github.io/vue-loader/workflow/production.html
config.plugins = (config.plugins || []).concat([
  new ExtractTextPlugin('style.css'),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin()
])

module.exports = config
