// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../../../static/apps/xsxx-xxrcgl/index.html'),
    assetsRoot: path.resolve(__dirname, '../../../static/apps/xsxx-xxrcgl'),
    assetsSubDirectory: '',
    assetsPublicPath: '',
    productionSourceMap: true
  },
  dev: {
    env: require('./dev.env'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    port: 3000,
    proxyTable: {"/xsxx": "http://localhost:8080"}
  }
}
