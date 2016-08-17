/* eslint-disable */
// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  // 可以在此处指定多个入口文件
  entry: {
    'hello/index': './apps/hello/main.js'
  },
  build: {
    'env': require('./prod.env'),
    // 指定build打包发布路径
    'hello/index': path.resolve(__dirname, '../dist/hello/index.html'),
    'assetsRoot': path.resolve(__dirname, '../dist'),
    'assetsSubDirectory': '',
    'assetsPublicPath': '/',
    'productionSourceMap': true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    'productionGzip': false,
    'productionGzipExtensions': ['js', 'css']
  },
  dev: {
    'env': require('./dev.env'),
    'port': 3000,
    'assetsSubDirectory': '',
    'assetsPublicPath': '/',
    'proxyTable': {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    'cssSourceMap': false
  }
}
