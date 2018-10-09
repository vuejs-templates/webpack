const path = require('path')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const utils = require('./utils')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  target: 'node',
  entry: path.join(__dirname, '../src/skeleton.entry.js'),
  output: {
    path: path.join(__dirname, '../server-dist'),
    filename: 'server.bundle.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  externals: Object.keys(require('../package.json').dependencies),
  resolve: {
    alias: {
      'vue#': 'vue/dist/vue.runtime.min.js',
      '@': resolve('src')
    }
  },
  plugins: [
    new VueSSRServerPlugin({
      filename: 'skeleton.json'
    })
  ]
}