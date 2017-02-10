/* eslint-disable */
var path = require('path')
var assign = require('object-assign')
var config = require('./config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var globalConf = require('../src/config/global')

var hasElement = function(arr) { // 判断数组是否不为空
    return arr && arr.length > 0;
}

var babelDir = [
    path.resolve(__dirname, '../src'),
    path.resolve(__dirname, 'tmp')
];

if (hasElement(globalConf.babelDir)) {
    babelDir = babelDir.concat(globalConf.babelDir)
}

var alias = assign({
    'src': path.resolve(__dirname, '../src'),
    'pages': path.resolve(__dirname, '../src/pages'),
    'core': path.resolve(__dirname, '../src/core'),
    'router': path.resolve(__dirname, '../src/core/router'),
    'conf': path.resolve(__dirname, '../src/config'),
    'node_modules': path.resolve(__dirname, '../node_modules')
}, globalConf.alias);

var loaders = [
  {
    test: /\.vue$/,
    loader: 'vue'
  },
  {
    test: /\.js$/,
    loader: 'babel',
    include: babelDir
  },
  {
    test: /\.json$/,
    loader: 'json'
  },
  {
    test: /\.html$/,
    loader: 'vue-html'
  },
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url',
    query: {
      limit: 10000,
      name: utils.assetsPath('statics/imgs/hash/[name].[hash:7].[ext]')
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url',
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
    publicPath: process.env.NODE_ENV === 'production' ? '../' : config.dev.assetsPublicPath,
    filename: '[name]/[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: alias
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: loaders
  },
  babel: {
      presets: ['es2015'],
      plugins: ['transform-runtime']
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    loaders: utils.cssLoaders()
  }
}
