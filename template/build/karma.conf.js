var webpackConf = require('./webpack.base.conf')
delete webpackConf.entry
webpackConf.devtool = 'inline-source-map'

// Having a coverage tool makes sourcemaps pretty much useless
// You can change this value to false for easier debugging
var useCoverage = true
if (useCoverage) {
  webpackConf.vue = {
    loaders: {
      js: 'isparta'
    }
  }

  webpackConf.module.preLoaders.forEach(function (preLoader) {
    if (preLoader.test.toString() === '/\\.js$/') {
      preLoader.loader = `isparta!${preLoader.loader}`
      preLoader.exclude = /(test|node_modules)/
    }
  })

  webpackConf.module.preLoaders.push({
    test: /\.js$/,
    loader: 'eslint',
    include: /test/
  })

  webpackConf.isparta = {
    embedSource: true,
    noAutoWrap: true
  }
}

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    reporters: ['spec', 'coverage'],
    files: ['../test/unit/index.js'],
    preprocessors: {
      '../test/unit/index.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConf,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      type: 'lcov',
      dir: '../coverage'
    }
  })
}
