var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

var path = require('path');
var SpritesmithPlugin = require('webpack-spritesmith')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': resolve('src'),
      'assets': resolve('src/assets'),
      'components': resolve('src/app/components'),
      'pages': resolve('src/app/pages'),
      'router': resolve('src/app/router'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 100,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, '../src/sprites/images'),
        glob: '*.png'
      },
      target: {
        image: path.resolve(__dirname, '../src/sprites/generated/sprite.png'),
        css: [
          [path.resolve(__dirname, '../src/sprites/generated/sprite.less'), {format: 'customSmTemplate'}],
          [path.resolve(__dirname, '../src/sprites/generated/sprite-texturepacker-like.less'), {format: 'texturepacker-like'}]
        ]
      },
      /*retina: "@2x",*/
      apiOptions: {
        cssImageRef: "./sprite.png",
        /*generateSpriteName: function (arg1, arg2, arg3) {
         //console.log(this);
         return "tutu" + arg1;
         },*/
      },
      spritesmithOptions: {
        algorithm: 'binary-tree',
        padding: 2
      },
      customTemplates: {
        'customSmTemplate': path.resolve(__dirname, '../src/sprites/templates/custom-sm.template.handlebars'),
        'customSmTemplate_retina': path.resolve(__dirname, '../src/sprites/templates/custom-sm_retina.template.handlebars'),
        'texturepacker-like': path.resolve(__dirname, '../src/sprites/templates/texturepacker-like.template.handlebars')
      }
    })
  ]
}
