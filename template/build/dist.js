require('./check-versions')()

process.env.NODE_ENV = 'production'
process.env.FOR_DISTRIBUTION = 'true'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.dist.conf')

var spinner = ora('building library for distribution...')
spinner.start()

rm(config.dist.assetsRoot, err => {
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
            '  Tip: built files are meant to be distributed over the npm registry.\n' +
            '  Opening index.html over file:// won\'t work.\n'
        ))
    })
})
