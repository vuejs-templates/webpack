'use strict'
// This is the webpack config used for unit tests with karma/mocha.
require('dotenv').config() // This should always be loaded first!
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'TEST'
}

const webpack = require('webpack')
const merge = require('webpack-merge')

const utils = require('./utils')
const baseWebpackConfig = require('./webpack.base.conf')

const webpackConfig = merge(baseWebpackConfig, {
  // use inline sourcemap for karma-sourcemap-loader
  module: {
    rules: utils.styleLoaders()
  },
  devtool: '#inline-source-map',
  resolveLoader: {
    alias: {
      // necessary to to make lang="scss" work in test when using vue-loader's ?inject option
      // see discussion at https://github.com/vuejs/vue-loader/issues/724
      'scss-loader': 'sass-loader'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': utils.stringifiedEnvVars
    })
  ]
})

// no need for app entry during tests
delete webpackConfig.entry

module.exports = webpackConfig
