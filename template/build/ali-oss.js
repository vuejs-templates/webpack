/**
 * 通过jssdk管理阿里oss
 */
var path = require('path');
var through2 = require('through2');
var OSS = require('ali-oss');
var co = require('co');
var client = null;

function oss(options) {

  if(!client) {
    client = new OSS({
      accessKeyId: options.accessKeyId,
      accessKeySecret: options.accessKeySecret,
      region: options.region,
      bucket: options.bucket
    });
  }
  // 获取当前版本
  return through2.obj(function (file, enc, cb) {
    if (file.isDirectory()) return cb();
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }
    /**
     * 获得要上传的文件在服务器上的名称
     */
    var getFileKey = function () {
      return options.prefix + '/' + options.version + '/' + path.relative(file.base, file.path).replace(/\\/g, '/');
    };

    co(function* () {
      var dest = getFileKey();
      // 上传文件
      yield client.put(dest, file.path);
    }).catch(function (err) {
      console.log(err)
    });
    this.push(file);
    return cb();
  });
}

module.exports = oss;

