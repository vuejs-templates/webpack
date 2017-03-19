var gulp = require('gulp')
var uploadToUpyun = require('upyun_cdn')
var config = require('./config')
var options = {
  src: ['../Public/**'],
  dest: config.cdn.upyun.folder
}
var auth = {
  bucket: config.cdn.upyun.bucket,
  operator: config.cdn.upyun.username,
  password: config.cdn.upyun.password
}
gulp.task('uploadToUpyun', function () {
  uploadToUpyun(options, auth, function (err, result) {
    if (err) {
      console.log(err)
    }
  })
})
