
'use strict'
// Template version: 1.1.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const prdConf = require('./entry').prdConf


let build = {
  env: require('./prod.env'),
  // index: path.resolve(__dirname, '../dist/login.vue'),
  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',
  productionSourceMap: true,
  // Gzip off by default as many popular static hosts such as
  // Surge or Netlify already gzip all static assets for you.
  // Before setting to `true`, make sure to:
  // npm install --save-dev compression-webpack-plugin
  productionGzip: true,
  productionGzipExtensions: ['js', 'css'],
  // Run the build command with an extra argument to
  // View the bundle analyzer report after build finishes:
  // `npm run build --report`
  // Set to `true` or `false` to always turn it on or off
  bundleAnalyzerReport: process.env.npm_config_report
}

// prdConf.map((v, i, a) => {
//   build[v.key] = path.resolve(__dirname, v.prdHtmlWebpackPlugin)
// })

module.exports = {
  build: {...build, ...prdConf},
  dev: {
    env: require('./dev.env'),
    port: process.env.PORT || 9100,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: require('./proxyTable'),
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
