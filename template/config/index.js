/* eslint-disable */
// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');
var fs = require('fs');
var proxyTable = require('./proxy'); // 支持代理

var appDir = path.resolve(__dirname, '../apps');
var apps = fs.readdirSync(appDir);

if (apps.length === 0) {
    throw 'no app defined in ./apps/';
}

var buildConf = {
    'env': require('./prod.env'),
    // 指定build打包发布路径
    'assetsRoot': path.resolve(__dirname, '../dist'),
    'assetsSubDirectory': '',
    'assetsPublicPath': '',
    'productionSourceMap': true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    'productionGzip': false,
    'productionGzipExtensions': ['js', 'css']
};

var entries = {};
var dists = {};

if (apps.length > 1) {
    apps.forEach(app => {
        entries[`${app}/index`] = `./apps/${app}/main.js`;
        buildConf[`${app}/index`] = path.resolve(__dirname, `../dist/${app}/index.html`);
    });
} else { // 若只有一个 app，则直接打包到根目录，不需要用子目录来区分
    var app = apps[0];
    entries[app] = `./apps/${app}/main.js`;
    buildConf[app] = path.resolve(__dirname, `../dist/index.html`);
}

module.exports = {
  // 可以在此处指定多个入口文件
  entry: entries,
  build: buildConf,
  dev: {
    'env': require('./dev.env'),
    'port': 3000,
    'assetsSubDirectory': '',
    'assetsPublicPath': '/',
    'proxyTable': proxyTable,
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    'cssSourceMap': false
  }
}
