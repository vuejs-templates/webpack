// https://github.com/shelljs/shelljs
require('./check-versions')()
require('shelljs/global')
env.NODE_ENV = 'production'

var path = require('path')
var utils = require('./utils')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
utils.cleanPath(assetsPath)
cp('-R', 'static/*', assetsPath)

utils.webpackBuild(webpackConfig, 'building for production...')
