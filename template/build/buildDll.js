// https://github.com/shelljs/shelljs
require('shelljs/global')

//import path from 'path'
//var config = require('../config')
const ora     = require('ora')
const webpack = require('webpack')

const webpackDllConfig = require('./webpack.dll.conf')

console.log(
  `  Tip:\n
     Built files are meant to be served over an HTTP server.\n
     Opening index.html over file:// won\'t work.\n
     dirname: ${__dirname}\n
  `
)

let spinner = ora('building for webpackDll...')
spinner.start()

/*var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
 rm('-rf', assetsPath)
 mkdir('-p', assetsPath)
 cp('-R', 'static/', assetsPath)*/

webpack(webpackDllConfig, function (err, stats) {
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

