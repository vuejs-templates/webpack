var path = require('path')
var config = require('../config/test.env.js')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')

module.exports = merge(baseWebpackConfig, {
  entry: {},
  module: {
    postLoaders: [
      {
        test: /\.ts$/,
        loader: 'istanbul-instrumenter',
        include: path.resolve('src/')
      }
    ]
  },
  devtool: '#inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config
    })
  ],
  ts: {
    compilerOptions: {
      sourceMap: false,
      inlineSourceMap: true
    }
  }
})
