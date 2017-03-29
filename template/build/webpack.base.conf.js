/* eslint-disable */
var path = require('path')
var assign = require('object-assign')
var config = require('./config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var globalConf = require('../build.config')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var hasElement = function(arr) { // 判断数组是否不为空
    return arr && arr.length > 0;
}

var babelDir = [
    path.resolve(__dirname, '../src'),
    path.resolve(__dirname, './tmp'),
    path.resolve(__dirname, './template')
];

if (hasElement(globalConf.babelDir)) {
    babelDir = babelDir.concat(globalConf.babelDir)
}

var alias = assign({
    'src': path.resolve(__dirname, '../src'),
    'pages': path.resolve(__dirname, '../src/pages'),
    'core': path.resolve(__dirname, '../src/core'),
    'conf': path.resolve(__dirname, '../src/config'),
    'router': path.resolve(__dirname, './template/router'),
    'node_modules': path.resolve(__dirname, '../node_modules')
}, globalConf.alias);

var loaders = [
  {
    test: /\.vue$/,
    loader: 'vue-loader'
  },
  {
    test: /\.js$/,
    loader: 'babel-loader',
    include: babelDir
  },
  {
    test: /\.json$/,
    loader: 'json-loader'
  },
  {
    test: /\.html$/,
    loader: 'vue-html-loader'
  },
  {
    test: /\.css$/,
    loader: 'style-loader!css-loader'
  },
  {
    test: /\.less$/,
    loader: 'style-loader!css-loader!less-loader'
  },
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 10000,
      name: utils.assetsPath('statics/imgs/hash/[name].[hash:7].[ext]')
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 10000,
      name: utils.assetsPath('statics/fonts/[name].[hash:7].[ext]')
    }
  }
]

if (hasElement(globalConf.loaders)) {
    loaders = loaders.concat(globalConf.loaders)
}

module.exports = {
  entry: config.entry,
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? './' : config.dev.assetsPublicPath,
    filename: '[name]/[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [resolve('src'), resolve('node_modules')],
    alias: alias
  },
  module: {
    rules: loaders
  },
  externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter'
  }
}
