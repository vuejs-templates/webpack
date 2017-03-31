var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  scoped: true,
  hmr: config.dev.hotModuleReload,
  transformToRequire: {
    // The key should be element name,
    // the value should be attribute name or its array
    img: 'src'
  }
}
