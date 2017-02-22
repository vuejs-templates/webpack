/* eslint-disable */
var path = require('path')
var config = require('./config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

var plugins = [];

var entryKeys = Object.keys(baseWebpackConfig.entry);
if (entryKeys.length > 1) {
    entryKeys.forEach(function (name) {
        plugins.push(new HtmlWebpackPlugin({
          filename: process.env.NODE_ENV === 'testing'
            ? 'index.html'
            : config.build[name],
          template: path.resolve(__dirname, 'tmp', name, 'index.html'),
          inject: true,
          chunks: [name, 'manifest', 'vendor'],
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
            // more options:
            // https://github.com/kangax/html-minifier#options-quick-reference
          },
          // necessary to consistently work with multiple chunks via CommonsChunkPlugin
          chunksSortMode: 'dependency'
        }));
    });
} else {
    var name = entryKeys[0];
    plugins.push(new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build[name],
      template: path.resolve(__dirname, 'tmp', name, 'index.html'),
      inject: true,
      chunks: [name, 'manifest', 'vendor'],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }));
}

var webpackConfig = merge(baseWebpackConfig, {
  // module: {
  //   rules: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
  // },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('[name]/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('common/[id].[chunkhash].js')
  },
  // vue: {
  //   loaders: utils.cssLoaders({
  //     sourceMap: config.build.productionSourceMap,
  //     extract: true
  //   })
  // },
  plugins: [
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin({filename: utils.assetsPath('[name]/[name].[contenthash].css')}),
    new OptimizeCSSPlugin()
  ]
  .concat(plugins)
  .concat([
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ])
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = webpackConfig
