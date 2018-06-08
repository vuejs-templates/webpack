let targetRoot = 'http://localhost'
let port = require('../service/config').dev.port

module.exports = {
  '/devapi/**': {
    target: targetRoot + ':' + port,
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/devapi': '/'
    }
  },
  '/testapi/**': {
    target: targetRootTest,
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/testapi': '/api'
    }
  }
}
