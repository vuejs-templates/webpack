var connect = require('connect')
var serveStatic = require('serve-static')
var path = require('path')

var distDir = require('./build.config').distDir

connect().use(serveStatic(path.resolve(__dirname, distDir))).listen(3000, function () {
    console.log('Server running on 3000...')
})
