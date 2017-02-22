/* eslint-disable */
// https://github.com/shelljs/shelljs
require('shelljs/global')
env.NODE_ENV = 'production'

var path = require('path')
var config = require('./config')
var ora = require('ora')
var chalk = require('chalk')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', 'src/statics/', path.resolve(assetsPath, 'statics'))

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

console.log(chalk.cyan('  Build complete.\n'))
console.log(chalk.yellow(
  '  Tip: built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
))
})
