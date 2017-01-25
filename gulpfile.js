var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var pug        = require('gulp-pug');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch('src/temp/*.pug', ['views']);
    gulp.watch("src/sass/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

 
gulp.task('views', function () {
  return gulp.src('src/temp/*.pug')
  .pipe(pug({ pretty:true}))
  .pipe(gulp.dest('./'))
});



gulp.task('default', ['serve']);
