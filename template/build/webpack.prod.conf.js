var path = require('path')
var fs=require('fs')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var SvgStore = require('webpack-svgstore-plugin');
var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

var _=require('lodash')
var webpackConfig = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    ].concat(generateHtml(config.htmls)).concat([
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

var hasSvgFolder=fs.existsSync(path.join(config.alias.assets, './svg'))
if(hasSvgFolder){
  webpackConfig.plugins.push(new SvgStore(
    [
      path.join(config.alias.assets, 'svg', '**/*.svg')
    ],
    //path.join(config.build.assetsRoot,config.build.assetsSubDirectory,'svg'),
    'static/svg',
    {
      name: 'sprite.svg',
      prefix:'',
      baseUrl:'./',
      chunk:'app',
      svgoOptions: {
        plugins: [
          { removeTitle: true }
        ]
      }
    }
  ))
}


function generateHtml(htmlCfgs){
  var htmls=[],temp
  _.each(htmlCfgs,function(v){
    temp=_.assign({},{
      inject: true,
      /* minify: {
       removeComments: true,
       collapseWhitespace: true,
       removeAttributeQuotes: true
       // more options:
       // https://github.com/kangax/html-minifier#options-quick-reference
       },*/
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    },v,{
      fileName:process.env.NODE_ENV === 'testing'   ? v.filename  :path.join(config.build.assetsRoot,v.filename),
    });
    htmls.push(new HtmlWebpackPlugin(temp))
  });
  return htmls;


}
module.exports = webpackConfig
