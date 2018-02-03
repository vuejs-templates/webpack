/**
 * Created by nocoolyoyo on 2017/12/28.
 */
/* 用gulp 主要是为了使用gulp-smushit插件，该插件的图片压缩率极高 */

var gulp = require('gulp'),
      smushit = require('gulp-smushit');
      const path = [
        'src/assets/img',//assets下的图片压缩
        'static/img'//static下的图片压缩
      ]

gulp.task('min-img', function () {
  path.forEach(function (p1, p2, p3) {
    gulp.src(p1 + '/**/*.{png,jpg,gif,ico}')
      .pipe(smushit({
        verbose: true
      }))
      .pipe(gulp.dest(p1));
  })
});
