// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack
require("babel-register")({
  presets: 'env'
});
const webpackConfig = require('../../build/webpack.test.conf.js').default;

module.exports = function (config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'sinon-chai', 'phantomjs-shim'],
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
