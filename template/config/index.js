// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path')
//const pathConfig = require('../config/pathConfig')

module.exports = {
  build: {
    env                     : {
      NODE_ENV: '"production"'
    },
    //index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot              : path.resolve(__dirname, '../../be/www/dist/'),
    assetsJSRoot            : path.resolve(__dirname, '../../be/www/dist/js/'),
    assetsSubDirectory      : 'static',
    assetsPublicPath        : '/',
    viewRoot                : path.resolve(__dirname, '../../be/view/'),
    productionSourceMap     : true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip          : false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env               : {
      NODE_ENV: '"development"'
    },
    port              : 8080,
    assetsRoot        : path.resolve(__dirname, '../static/'),
    assetsJSRoot      : path.resolve(__dirname, '../static/js/'),
    assetsSubDirectory: 'static',
    assetsPublicPath  : '/',
    viewRoot          : path.resolve(__dirname, '../view/'),
    proxyTable        : {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap      : true
  },
  test : {
    env               : {
      NODE_ENV: '"testing"'
    },
    port              : 8080,
    assetsRoot        : path.resolve(__dirname, '../../be/www/static/'),
    assetsJSRoot      : path.resolve(__dirname, '../../be/www/static/js'),
    assetsSubDirectory: 'static',
    assetsPublicPath  : '/',
    viewRoot          : path.resolve(__dirname, '../../be/view/'),
    proxyTable        : {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap      : false
  }
}
