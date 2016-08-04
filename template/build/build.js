// https://github.com/shelljs/shelljs
require('shelljs/global')
//env.NODE_ENV = 'production'

const path          = require('path')
const config        = require('../config')
const ora           = require('ora')
const webpack       = require('webpack')
const webpackConfig = require('./webpack.prod.conf')

console.log(
  `  
     Tip:\n
     Built files are meant to be served over an HTTP server.\n
     Opening index.html over file:// won\'t work.\n
  `
)

const spinner = ora('building for production...')
spinner.start()

const assetsPath    = path.resolve(config.build.assetsRoot)
const assetsJSPath  = path.resolve(config.build.assetsJSRoot)
const assetsCSSPath = path.resolve(assetsPath, './css')
rm('-rf', assetsJSPath)
rm('-rf', assetsCSSPath)
mkdir('-p', assetsJSPath)
mkdir('-p', assetsCSSPath)
cp('-R', 'dll/js/', assetsJSPath)

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
      colors      : true,
      modules     : false,
      children    : false,
      chunks      : false,
      chunkModules: false
    }) + '\n')
})
