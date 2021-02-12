var gulp = require('gulp');
var notify = require("gulp-notify");
var plumber = require("gulp-plumber");
var sass = require('gulp-sass');
var header = require('gulp-header');
var sassGlob = require("gulp-sass-glob");
var autoprefixer = require('gulp-autoprefixer');
var pug = require('gulp-pug');
var browserSync = require('browser-sync');
var cssmin = require('gulp-cssmin');
var webpackStream = require('webpack-stream');
var webpack = require('webpack');

const webpackConfig = require('./webpack.config');

//setting : paths
var paths = {
  'scss': './src/sass/',
  'css': './common/css/',
  'pug': './src/pug/',
  'html': './',
  'appjs': './src/js/',
  'js': './common/js/'
}
//setting : Sass Options
var sassOptions = {
  outputStyle: 'compressed'
}
//setting : Pug Options
var pugOptions = {
  pretty: true
}

//Sass
gulp.task('scss', function () {
  return gulp.src(paths.scss + '**/*.scss')
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(sassGlob())
    .pipe(sass({sassOptions}))
    .pipe(autoprefixer())
    // .pipe(header('@charset "UTF-8";\n\n'))
    .pipe(gulp.dest(paths.css));
});

gulp.task('cssmin', function () {
  return gulp.src([paths.css + 'style.css'])
  .pipe(cssmin())
  .pipe(gulp.dest(paths.css));
});

//Pug
gulp.task('pug', () => {
  return gulp.src([paths.pug + '**/*.pug','!' + paths.pug + '**/_*.pug'])
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(pug(pugOptions))
    .pipe(gulp.dest(paths.html));
});

//Webpack
gulp.task('webpack', function() {
  return webpackStream(webpackConfig, webpack)
  .pipe(gulp.dest(paths.js));
});

//Browser Sync
gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: paths.html
    }
  });
  gulp.watch(paths.js + "*.js", gulp.task('reload'));
  gulp.watch(paths.html + "*.html", gulp.task('reload'));
  gulp.watch(paths.css + "*.css", gulp.series('reload'));
});
gulp.task("reload", function (done) {
  browserSync.reload();
  done();
});

//watch
gulp.task('watch', function () {
  gulp.watch(paths.scss + '**/*.scss', gulp.task('scss'));
  gulp.watch(paths.pug + '**/*.pug', gulp.task('pug'));
  gulp.watch(paths.appjs + '**/*.js', gulp.task('webpack'));
});

gulp.task('default', gulp.parallel('browser-sync', 'watch'));
