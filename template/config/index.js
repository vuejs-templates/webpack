// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var _=require('lodash')
var projectRoot = path.resolve(__dirname, '../')
module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '',//change to relative path
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 3005,
    assetsSubDirectory: 'static',
    assetsPublicPath: '',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  },
  externals:{
    //vue:'Vue'
  },
  alias: {
    'src': path.resolve(projectRoot, './src'),
    'assets': path.resolve(projectRoot, './src/assets'),
    'components': path.resolve(projectRoot, './src/components')
  },
  entry: {
    app: ['./src/main.js',/*'./src/assets/css/app.less'*/],

  },
  htmls:assignDefault([
      {
        chunks:['manifest','vendor','app'],
        filename:'index.html'
      }

  ])
}

function assignDefault(htmls){
  var re=[],temp;
   _.each(htmls,function(v){
     temp=_.assign({},{//default cfg
       hash:false,
       //TODO put you fav icon
       favicon:path.resolve(projectRoot, './src/assets/logo.png')
     },v)
     temp.template=path.resolve(projectRoot,'./src/html/',temp.filename)
     re.push(temp)
   })

  return re;

}