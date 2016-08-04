/**
 * Created by su9er on 16/8/4.
 */
const fs          = require('fs')
const path        = require('path')
const gulp        = require('gulp')
const sass        = require('gulp-sass')
const buffer      = require('vinyl-buffer')
const spritesmith = require('gulp.spritesmith')
const imagemin    = require('gulp-imagemin')
const pngquant    = require('imagemin-pngquant')

const spritesPath = path.resolve(__dirname, './src/assets/sprites')

const spritesArray = [];

/* collectSpritesTask */
(function (dir) {
  fs.readdirSync(dir).forEach((name) = > {
    const spritesDir = path.resolve(spritesPath, `./${name}`)
    const state = fs.lstatSync(spritesDir)
    if (state.isDirectory() && fs.readdirSync(spritesDir).length
  )
  {
    const gulpTask = `sprites:${name}`
    spritesArray.push(gulpTask)
    gulp.task(gulpTask, () = > {
      const spritesData = gulp.src(path.resolve(spritesDir, './*.png'))
        .pipe(spritesmith({
          imgName: `${name}_icon.png`,
          imgPath: `/img/${name}_icon.png`,
          cssName: `_${name}_icon.scss`
        }))
      spritesData.css
      .pipe(gulp.dest(path.resolve(__dirname, './src/assets/css/')))
    spritesData.img
      .pipe(buffer())
      .pipe(imagemin({
        optimizationLevel: 7,  // 类型：Number  默认：3  取值范围：0-7（优化等级）
        use              : [pngquant()]      // 使用pngquant深度压缩png图片的imagemin插件
      }))
      .pipe(gulp.dest(path.resolve(__dirname, './static/img/')))
      .pipe(gulp.dest(path.resolve(__dirname, '../be/www/static/img/')))
      .pipe(gulp.dest(path.resolve(__dirname, '../be/www/dist/img/')))
  })
  }
})
}(spritesPath))

gulp.task('sprites', spritesArray)

/*
 * scss:single 不依赖图片的合并
 * */
gulp.task('scss:single', () = > {
  gulp.src(path.resolve(spritesPath, '../css/*.scss'))
  .pipe(sass({
    outputStyle: 'compressed'
  }).on('error', sass.logError))
  .pipe(gulp.dest(path.resolve(__dirname, './static/css/')))
  .pipe(gulp.dest(path.resolve(__dirname, '../be/www/static/css/')))
  .pipe(gulp.dest(path.resolve(__dirname, '../be/www/dist/css/')))
})

gulp.task('scss', ['sprites'], () = > {
  gulp.src(path.resolve(spritesPath, '../css/*.scss'))
  .pipe(sass({
    outputStyle: 'compressed'
  }).on('error', sass.logError))
  .pipe(gulp.dest(path.resolve(__dirname, './static/css/')))
  .pipe(gulp.dest(path.resolve(__dirname, '../be/www/static/css/')))
  .pipe(gulp.dest(path.resolve(__dirname, '../be/www/dist/css/')))
})

gulp.task('default', ['sprites', 'sass'])
