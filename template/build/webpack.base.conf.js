/* eslint-disable */
var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

var babelDir = [
    path.resolve(__dirname, '../src'),
    path.resolve(__dirname, '../apps'),
    /bh-vue/
    /*/wec-vue/*/
];

module.exports = {
  entry: config.entry,
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'router': path.resolve(__dirname, '../src/router'),
      'components': path.resolve(__dirname, '../src/components'),
      'conf': path.resolve(__dirname, '../src/config'),
      'api': path.resolve(__dirname, '../src/config/api'),
      {{#wisedu}}
      'App': path.resolve(__dirname, '../src/App'),
      'sysconf': path.resolve(__dirname, '../src/config/sysconfig'),
      'bh-vue': path.resolve(__dirname, '../node_modules/bh-vue'),
      'wec-vue': path.resolve(__dirname, '../node_modules/wec-vue'),
      'bh-util': path.resolve(__dirname, '../node_modules/bh-vue/utils'),
      {{/wisedu}}
      'apps': path.resolve(__dirname, '../apps'),
      'services': path.resolve(__dirname, '../src/services'),
      'vuex': path.resolve(__dirname, '../src/vuex'),
      'res': path.resolve(__dirname, '../static/resources'),
      'img': path.resolve(__dirname, '../static/resources/img'),
      'static': path.resolve(__dirname, '../static')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [
      // {
      //   test: /\.vue$/,
      //   loader: 'eslint',
      //   include: projectRoot,
      //   exclude: /node_modules/
      // },
      // {
      //   test: /\.js$/,
      //   loader: 'eslint',
      //   include: projectRoot,
      //   exclude: /node_modules/
      // }
    ],
    loaders: [
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
          name: utils.assetsPath('resources/imgs/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    loaders: utils.cssLoaders()
  }
}
