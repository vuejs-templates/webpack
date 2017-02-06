/* eslint-disable */
var path = require('path');
var config = require('./config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var plugins = [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
];

// add hot-reload related code to entry chunks
var entryKeys = Object.keys(baseWebpackConfig.entry);
if (entryKeys.length > 1) {
    entryKeys.forEach(function (name) {
      baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
      plugins.push(new HtmlWebpackPlugin({
        filename: name + '.html',
        template: path.resolve(__dirname, 'tmp', name, '..', 'index.html'),
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

module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // eval-source-map is faster for development
  // devtool: '#eval-source-map',
  plugins: plugins
})
