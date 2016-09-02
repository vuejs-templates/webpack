// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('../../build/webpack.base.conf')
const utils = require('../../build/utils')
const webpack = require('webpack')
const projectRoot = path.resolve(__dirname, '../../')


const webpackConfig = merge(baseConfig, {
    // use inline sourcemap for karma-sourcemap-loader
  module: {
    loaders: utils.styleLoaders(),
  },
  devtool: '#inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../../config/test.env'),
    }),
  ],
})

// no need for app entry during tests
delete webpackConfig.entry

webpackConfig.module.preLoaders = webpackConfig.module.preLoaders || []
webpackConfig.module.preLoaders.unshift({
  test: /\.js$/,
  include: path.resolve(projectRoot, 'src'),
})

webpackConfig.module.loaders.some(function(loader, i) {
  if (loader.loader === 'babel') {
    loader.include = path.resolve(projectRoot, 'test/unit')
    return true
  }
})

module.exports = function(config) {
  config.set({
        // to run in additional browsers:
        // 1. install corresponding karma launcher
        //    http://karma-runner.github.io/0.13/config/browsers.html
        // 2. add it to the `browsers` array below.
        browsers: ['PhantomJS'],
        frameworks: ['mocha', 'sinon-chai'],
        reporters: ['spec', 'coverage'],
        files: ['./index.js'],
        preprocessors: {
          './index.js': ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        webpackMiddleware: {
          noInfo: true
        },
        coverageReporter: {
          dir: './coverage',
          reporters: [
          { type: 'lcov', subdir: '.' },
          { type: 'text-summary' }
          ]
        }
      })
}
