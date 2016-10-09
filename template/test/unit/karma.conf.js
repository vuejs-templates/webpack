// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

var path = require('path'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
var merge = require('webpack-merge'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
var baseConfig = require('../../build/webpack.base.conf'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
var utils = require('../../build/utils'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
var webpack = require('webpack'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
var projectRoot = path.resolve(__dirname, '../../'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

var webpackConfig = merge(baseConfig, {
  // use inline sourcemap for karma-sourcemap-loader
  module: {
    loaders: utils.styleLoaders()
  },
  devtool: '#inline-source-map',
  vue: {
    loaders: {
      js: 'isparta'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../../config/test.env')
    })
  ]
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

// no need for app entry during tests
delete webpackConfig.entry{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

// make sure isparta loader is applied before eslint
webpackConfig.module.preLoaders = webpackConfig.module.preLoaders || []{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
webpackConfig.module.preLoaders.unshift({
  test: /\.js$/,
  loader: 'isparta',
  include: path.resolve(projectRoot, 'src'){{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

// only apply babel for test files when using isparta
webpackConfig.module.loaders.some(function (loader, i) {
  if (loader.loader === 'babel') {
    loader.include = path.resolve(projectRoot, 'test/unit'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    return true{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

module.exports = function (config) {
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
      noInfo: true{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
      ]
    }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  }){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
