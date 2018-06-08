var express = require('express')
var config = require('./config')
var log4js = require('./logger')
var error  = require('./error')
var server = require('./server')
var app = express()
server(app)
error(app)

var server = app.listen(config.dev.port, function () {
  var host = server.address().address
  var port = server.address().port
  log4js.info('app listening at http://localhost:' + port)
})
