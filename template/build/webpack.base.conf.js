const path       = require('path')
const utils      = require('./utils')
const getEntries = require('./entry')

const fePath         = path.resolve(__dirname, '../')
const feSrcPath      = path.resolve(fePath, './src/')
const feAssetsPath   = path.resolve(feSrcPath, './assets')
const nodeModulePath = path.resolve(fePath, './node_modules/')

module.exports = {
  entry        : getEntries(path.resolve(feSrcPath, './entry/')),
  resolve      : {
    /*root: [
     path.resolve(__dirname, '../src')
     ],*/
    extensions: ['', '.js', '.vue'],
    fallback  : [nodeModulePath],
    alias     : {
      'src'       : feSrcPath,
      'assets'    : feAssetsPath,
      'lib'       : path.resolve(feSrcPath, './lib/'),
      'css'       : path.resolve(feAssetsPath, './css/'),
      'images'    : path.resolve(feAssetsPath, './images/'),
      'sprites'   : path.resolve(feAssetsPath, './sprites/'),
      'components': path.resolve(feSrcPath, './components/'),
      'entry'     : path.resolve(feSrcPath, './entry/'),
      'view'      : path.resolve(feSrcPath, './view/'),
      'pages'     : path.resolve(feSrcPath, './pages/')
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
     include: feSrcPath,
     exclude: /node_modules/
     },
     {
     test: /\.js$/,
     loader: 'eslint',
     include: feSrcPath,
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
        include: feSrcPath,
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
    loaders: utils.cssLoaders({
      extract: true
    })
  }
}
