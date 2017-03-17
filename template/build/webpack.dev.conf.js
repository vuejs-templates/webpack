var utils = require('./utils')
var path = require('path')
var glob = require('glob')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
})

function getEntry (globPath) {
  var _entries = {}
  var basename, tmp, pathname
  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry))
    tmp = entry.split('/').splice(-3)
    pathname = tmp.splice(1, 1).toString() + '/' + basename
    _entries[pathname] = entry
  })
  return _entries
}

var pages = getEntry('./src/module/**/*.html')
for (var pathname in pages) {
  var jspath = pathname.split('/').splice(-1).toString()
  // 配置生成的html文件，定义路径等
  var conf = {
    filename: pathname + '.html',
    template: pages[pathname], // 模板路径
    chunks: [jspath, 'vendor', 'manifest'], // 每个html引用的js模块
    inject: true
  }
  // 需要生成几个hmtl文件，就配置几个HtmlWebpackPlugin对象
  // https://github.com/ampedandwired/html-webpack-plugin
  module.exports.plugins.push(new HtmlWebpackPlugin(conf))
}
