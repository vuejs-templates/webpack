/* eslint-disable */
var path = require('path');
var utils = require('./utils')
var webpack = require('webpack')
var config = require('./config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

var plugins = [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    // new webpack.optimize.OccurenceOrderPlugin(), // The plugin is no longer needed and occurrence order is on by default.
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
];

// add hot-reload related code to entry chunks
var entryKeys = Object.keys(baseWebpackConfig.entry);
if (entryKeys.length > 1) {
    entryKeys.forEach(function (name) {
      baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
      plugins.push(new HtmlWebpackPlugin({
        filename: name + '/index.html',
        template: path.resolve(__dirname, 'tmp', name, 'index.html'),
        chunks: [name],
        inject: true
      }));
    })
} else {
    var name = entryKeys[0];
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
    plugins.push(new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, 'tmp', name, 'index.html'),
        chunks: [name],
        inject: true
    }));
}

plugins.push(new FriendlyErrorsPlugin())

module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, extract: false })
  },
  // eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: plugins
})
