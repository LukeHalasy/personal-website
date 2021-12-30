const gulp = require('gulp');

const dartSass = require('sass');
const gulpSass = require('gulp-sass');

const browserSync = require('browser-sync').create();

const sass = gulpSass(dartSass);


function watch() {
    browserSync.init({
      startPath: '/newfoundland.html',
      server: {
        baseDir: 'app',
      },
    })
    
    gulp.watch('app/scss/*.scss', style)
    gulp.watch('app/*.html').on('change',browserSync.reload);
}

function style() {
    return gulp.src('app/scss/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());
}

exports.style = style;
exports.watch = watch;
