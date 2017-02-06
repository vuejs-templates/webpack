/* eslint-disable */
// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');
var fs = require('fs');
require('shelljs/global');

var globalConf = require('../../src/config/global'); // 全局参数
var proxyTable = globalConf.proxy || {}; // 代理设置

var appDir = path.resolve(__dirname, '../../src/pages');
var apps = fs.readdirSync(appDir);
if (apps.length === 0) {
    throw 'no app defined in ./apps/';
}

var entries = {};
var dists = {};
var templateHtml = path.resolve(__dirname, '../template', 'index.tpl');
var templateJs = path.resolve(__dirname, '../template', 'index.js');
var tmpDir = path.resolve(__dirname, '../tmp');

var buildConf = {
    'env': require('./prod.env'),
    // 指定build打包发布路径
    'assetsRoot': path.resolve(__dirname, '../../dist'),
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


// 创建临时入口文件供打包使用
rm('-rf', tmpDir);
mkdir(tmpDir); // 删除并重新创建临时目录

// 读取模板文件
var tmpIndexHtml = fs.readFileSync(templateHtml, 'utf-8');
var tmpIndexJs = fs.readFileSync(templateJs, 'utf-8');

// 从routes文件中解析出 title
var getTitle = function(routesContent) {
    var m = routesContent.match(/title: \'(.*?)\',/);
    if (m && m.length === 2) {
        return m[1];
    } else {
        return '';
    }
};

if (apps.length > 1) {
    apps.forEach(app => {
        var title = getTitle(fs.readFileSync(path.resolve(appDir, app, 'routes.js'), 'utf-8'));
        var tmpAppDir = path.resolve(tmpDir, app);
        mkdir(tmpAppDir);
        var htmlContent = tmpIndexHtml.replace('[WIN_TITLE]', title || app)
            .replace('[CSS_LIBS]', '') // TODO: 插入自定义 css
            .replace('[JS_LIBS]', ''); // TODO: 插入自定义 js
        var jsContent = tmpIndexJs.replace(/\[PAGE_NAME\]/g, app);
        fs.writeFileSync(path.resolve(tmpAppDir, 'index.html'), htmlContent, 'utf-8');
        fs.writeFileSync(path.resolve(tmpAppDir, 'index.js'), jsContent, 'utf-8');
        entries[app] = `./build/tmp/${app}/index.js`;
        buildConf[app] = `./${app}/index.html`;
    });
} else { // 若只有一个 app，则直接打包到根目录，不需要用子目录来区分
    var app = apps[0];
    var title = getTitle(fs.readFileSync(path.resolve(appDir, app, 'routes.js'), 'utf-8'));
    var tmpAppDir = path.resolve(tmpDir, app);
    mkdir(tmpAppDir);
    var htmlContent = tmpIndexHtml.replace('[WIN_TITLE]', title || app)
        .replace('[CSS_LIBS]', '') // TODO: 插入自定义 css
        .replace('[JS_LIBS]', ''); // TODO: 插入自定义 js
    var jsContent = tmpIndexJs.replace(/\[PAGE_NAME\]/g, app);
    fs.writeFileSync(path.resolve(tmpAppDir, 'index.html'), htmlContent, 'utf-8');
    fs.writeFileSync(path.resolve(tmpAppDir, 'index.js'), jsContent, 'utf-8');
    entries[app] = `./build/tmp/${app}/index.js`;
    buildConf[app] = path.resolve(__dirname, `../../dist/index.html`);
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
