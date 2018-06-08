var cookieParser = require('cookie-parser')
var compression = require('compression')
var config = require('./config')
var path = require('path');

module.exports = function (app) {
  app.set('views', path.join(__dirname , '../dist'))
  app.set("view cache",true);
  app.engine('.html', require('ejs').__express)
  app.set('view engine', 'html')
  app.use(compression())
  app.use(cookieParser())
}