var path = require('path');
var log4js = require('log4js')
var env = process.env.NODE_ENV || 'dev';

var logger_info = log4js.getLogger('info');
logger_info.level ='INFO'

var logger_error = log4js.getLogger('error');
logger_error.level= 'ERROR'

module.exports = {
  info: function(msg) {
    logger_info.info(msg)
  },
  error: function(msg) {
    logger_error.error(msg)
  }
}
