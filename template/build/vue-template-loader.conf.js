var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  scoped: true,
  hmr: false, // Always disable hmr in vue-template-loader to avoid conflict with vue-hot-reload-loader
  transformToRequire: {
    // The key should be element name,
    // the value should be attribute name or its array
    img: 'src'
  }
}
