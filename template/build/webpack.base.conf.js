const path       = require('path')
const utils      = require('./utils')
const getEntries = require('./entry')

let feRoot         = path.resolve(__dirname, '../');
let feSrcRoot      = path.resolve(feRoot, './src/');
let nodeModulePath = path.resolve(feRoot, './node_modules/')

module.exports = {
  entry        : getEntries(path.resolve(feSrcRoot, './entry/')),
  resolve      : {
    /*root: [
     path.resolve(__dirname, '../src')
     ],*/
    extensions: ['', '.js', '.vue'],
    fallback  : [nodeModulePath],
    alias     : {
      'src'       : feSrcRoot,
      'assets'    : path.resolve(feSrcRoot, './assets/'),
      'js'        : path.resolve(feSrcRoot, './js/'),
      'css'       : path.resolve(feSrcRoot, './css/'),
      'images'    : path.resolve(feSrcRoot, './images/'),
      'sprites'   : path.resolve(feSrcRoot, './sprites/'),
      'components': path.resolve(feSrcRoot, './components/'),
      'entry'     : path.resolve(feSrcRoot, './entry/'),
      'view'      : path.resolve(feSrcRoot, './view/'),
      'pages'     : path.resolve(feSrcRoot, './pages/')
    }
  },
  resolveLoader: {
    fallback: [nodeModulePath]
  },
  module       : {
    /*preLoaders: [
     {
     test: /\.vue$/,
     loader: 'eslint',
     include: feSrcRoot,
     exclude: /node_modules/
     },
     {
     test: /\.js$/,
     loader: 'eslint',
     include: feSrcRoot,
     exclude: /node_modules/
     }
     ],*/
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test   : /\.js$/,
        loader : 'babel',
        include: feSrcRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      }
      /*,
       {
       test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
       loader: 'url',
       query: {
       limit: 10000,
       name: utils.assetsPath('img/[name].[hash:7].[ext]')
       }
       },
       {
       test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
       loader: 'url',
       query: {
       limit: 10000,
       name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
       }
       }*/
    ]
  },
  eslint       : {
    formatter: require('eslint-friendly-formatter')
  },
  vue          : {
    loaders: utils.cssLoaders()
  }
}
