'use strict';
let path = require('path');
let config = require('../config');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.assetsPath = function (_path) {
  let assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path)
};

exports.cssLoaders = function (options, type) {
  options = options || {};

  let cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  };

  let postcssLoader = {
    loader: 'postcss-loader'
  };

  // var vueStyleLoader = [cssLoader];
  // var globalStyleLoader = [cssLoader, postcssLoader];

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    /*
     添加type参数，type为global时是全局webpack的loader，其他则为vue-loader的配置项
     中间加入postcssloader将全局css文件都引入postcss
     */
    let loaders = type === 'global' ? [cssLoader, postcssLoader] : [cssLoader];
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }
    // Extract CSS when that option is specified
    // (which is the case during production build)
    // 分开全局和vue-loader配置
    if (options.extract) {
      return type === 'global' ? ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'style-loader'
      }) : ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return type === 'global' ? ['style-loader'].concat(loaders) : ['vue-style-loader'].concat(loaders)
    }
  }

  // 添加.vue文件 引入index.scss
  let sass_options = {data: '@import "~@/assets/css/index.scss";'};

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {indentedSyntax: true}),
    scss: generateLoaders('sass', sass_options),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  let output = [];
  // 添加global参数，表示为webpack的loader配置
  let loaders = exports.cssLoaders(options, 'global');
  for (let extension in loaders) {
    let loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
};

