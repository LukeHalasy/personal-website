const gulp = require('gulp');

const dartSass = require('sass');
const gulpSass = require('gulp-sass');

const cssnano = require('gulp-cssnano');
const gulpIf = require('gulp-if');
const useref = require('gulp-useref');
const svgmin = require('gulp-svgmin');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');

const browserSync = require('browser-sync').create();

const sass = gulpSass(dartSass);


function watch() {
    browserSync.init({
      startPath: '/index.html',
      server: {
        baseDir: 'app',
      },
    })
    
    gulp.watch('app/scss/*.scss', style)
    gulp.watch('app/*.html').on('change',browserSync.reload);
}

function style() {
    gulp.src("./node_modules/normalize.css/normalize.css")
      .pipe(rename(function (path) {
        path.basename = "_normalize";
        path.extname = ".scss";
      }))
      .pipe(gulp.dest("app/scss/"));

    return gulp.src('app/scss/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());
}

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('images-svg', function(){
  return gulp.src('app/images/**/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('dist/images'))
});

gulp.task('images-png', function(){
  return gulp.src('app/images/**/*.png')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
});

exports.style = style;
exports.watch = watch;
