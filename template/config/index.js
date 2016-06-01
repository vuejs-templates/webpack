// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    browsers: ['last 2 versions', 'ie 9-11']
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    proxyTable: {}
  }
}
