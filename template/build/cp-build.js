/**
 * Created by cuppi on 2017/6/15.
 */
require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
// var webpackConfig = require('./webpack.prod.conf')
var webpackConfig = require('./cp.webpack.prod.conf')

var cp_release_version = process.argv[2];
if (cp_release_version === 'beta'){
  console.log('正在打包beta版本...');
  config = require('../config/index.beta');
} else if (cp_release_version === 'pro'){
  console.log('正在打包pro版本...');
  config = require('../config/index.pro');
} else {
  console.log('缺少参数，将执行默认打包模式');
}

var spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
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
})
