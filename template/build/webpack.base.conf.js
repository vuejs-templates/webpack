'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
// const vuxLoader = require('vux-loader')
const entry = require('../config/entry')
const argv = require('yargs').argv

const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });
const isPro = process.env.NODE_ENV === 'production';
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// 私有库
const privateLibraries = [
  resolve('node_modules/vformer'), // form表单组件
  resolve('demo') // demo
]

let webpackConfig = {
  entry: entry.entry,
  // {
  //   app: './src/main.js'
  // },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: isPro ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [resolve('src'), resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // loader: 'happypack/loader?id=vue',
        include: [resolve('src'), ...privateLibraries],
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // loader: 'happypack/loader?id=js',
        include: [resolve('src'), resolve('test'), ...privateLibraries]
      },
      {
        test: /\.(less|css)$/,
        loader: 'style-loader!css-loader!less-loader',
        include: [resolve('src'), ...privateLibraries]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 5000,
          name: utils.assetsPath('img/[name].[ext]?r=[hash:7]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[ext]?r=[hash:7]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 5000,
          name: utils.assetsPath('fonts/[name].[ext]?r=[hash:7]')
        }
      }
    ]
  },
  plugins: [
    // new HappyPack({
    //   id: 'js',
    //   // threadPool: happyThreadPool,
    //   threads: 1,
    //   loaders: [ 'babel-loader' ],
    //   verbose: true
    // }),
    // new HappyPack({
    //   id: 'vue',
    //   // threadPool: happyThreadPool,
    //   threads: 2,
    //   loaders: [ 'vue-loader' ],
    //   verbose: true
    // })
  ]
}

module.exports = webpackConfig
// module.exports = vuxLoader.merge(webpackConfig, {
//   options: {
//     showVuxVersionInfo: false
//   },
//   plugins: [
//     {
//       name: 'vux-ui'
//     },
//     {
//       name: 'duplicate-style'
//     }
//   ]
// })
