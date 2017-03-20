/* eslint-disable */
// see http://vuejs-templates.github.io/webpack for documentation.
require('babel-register');
var path = require('path');
var fs = require('fs');
require('shelljs/global');

// 创建临时入口文件供打包使用
var tmpDir = path.resolve(__dirname, '../tmp');
rm('-rf', tmpDir);
mkdir(tmpDir); // 删除并重新创建临时目录

var globalConf = require('../../build.config.js'); // 全局参数
var proxyTable = globalConf.proxy || {}; // 代理设置

var appDir = path.resolve(__dirname, '../../src/pages');
var apps = fs.readdirSync(appDir);
if (apps.length === 0) {
    throw 'no app defined in ./apps/';
}

// 创建多语言文件
var localeTool = require('./localeTool');
localeTool.make();

var entries = {};
var dists = {};
var templateHtml = path.resolve(__dirname, '../template', 'index.tpl');
var templateJs = path.resolve(__dirname, '../template', 'index.js');

var hasElement = function(arr) { // 判断数组是否不为空
    return arr && arr.length > 0;
}

var getVendors = function(pageName) { // 读取页面需要额外加载的第三方库(js/css)
    var jslist = [], csslist = [];

    // 先加载全局lib
    if (hasElement(globalConf.jslibs)) {
        jslist = globalConf.jslibs.map(item => `<script src="${item}"></script>`);
    }

    if (hasElement(globalConf.csslibs)) {
        csslist = globalConf.csslibs.map(item => `<link rel="stylesheet" href="${item}">`);
    }

    // 然后加载页面范围的lib
    var confPath = path.resolve(__dirname, `../../src/pages/${pageName}/config.json`);
    if (fs.existsSync(confPath)) {
        var pageConf = fs.readFileSync(confPath, 'utf-8');
        try {
            pageConf = JSON.parse(pageConf);

            if (hasElement(pageConf.jslibs)) {
                jslist = jslist.concat(pageConf.jslibs.map(item => `<script src="${item}"></script>`));
            }

            if (hasElement(pageConf.csslibs)) {
                csslist = csslist.concat(pageConf.csslibs.map(item => `<link rel="stylesheet" href="${item}">`));
            }
        } catch (e) {
            console.error('page config file is invalid:', e);
        }
    }

    return {
        js: jslist.join('\n'),
        css: csslist.join('\n')
    };
};

var buildConf = {
    'env': require('./prod.env'),
    // 指定build打包发布路径
    'assetsRoot': globalConf.distDir,
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

// 读取模板文件
var tmpIndexHtml = fs.readFileSync(templateHtml, 'utf-8');
var tmpIndexJs = fs.readFileSync(templateJs, 'utf-8');

// 将短横线连接词转换为驼峰
var toCamel = function(word) {
    return word && word.replace(/-(\w)/g, function(a) {return a.charAt(1).toUpperCase();});
};

// 从routes文件中解析出 title
var getTitle = function(routesContent) {
    var m = routesContent.match(/title: \'(.*?)\',/);
    if (m && m.length === 2) {
        return m[1];
    } else {
        return '';
    }
};

var getPageConf = function(confFile) {
    try {
        var content = fs.readFileSync(confFile, 'utf-8');
        return JSON.parse(content);
    } catch (e) {
        return {"lang": "cn"};
    }
};

var prepareEntryFiles = function(app) {
    var title = getTitle(fs.readFileSync(path.resolve(appDir, app, 'routes.js'), 'utf-8'));
    var pageConfig = getPageConf(path.resolve(appDir, app, 'config.json'));
    var pageLang = pageConfig.lang;

    var tmpAppDir = path.resolve(tmpDir, app);
    var vendors = getVendors(app);
    mkdir(tmpAppDir);

    var htmlContent = tmpIndexHtml.replace('[WIN_TITLE]', title || app)
        .replace('[CSS_LIBS]', vendors.css) // 插入自定义 css
        .replace('[JS_LIBS]', vendors.js); // 插入自定义 js
    var entryName = toCamel(app);
    var jsContent = tmpIndexJs.replace(/\[PAGE_NAME\]/g, app)
        .replace(/\[ENTRY_NAME\]/g, entryName)
        .replace('[LANG_NAME]', pageLang);

    fs.writeFileSync(path.resolve(tmpAppDir, 'index.html'), htmlContent, 'utf-8');
    fs.writeFileSync(path.resolve(tmpAppDir, 'index.js'), jsContent, 'utf-8');
};

if (apps.length > 1) {
    apps.forEach(app => {
        prepareEntryFiles(app);
        entries[app] = `./build/tmp/${app}/index.js`;
        buildConf[app] = `./${app}/index.html`;
    });
} else { // 若只有一个 app，则直接打包到根目录，不需要用子目录来区分
    var app = apps[0];
    prepareEntryFiles(app);
    entries[app] = `./build/tmp/${app}/index.js`;
    buildConf[app] = path.resolve(globalConf.distDir, 'index.html');
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
