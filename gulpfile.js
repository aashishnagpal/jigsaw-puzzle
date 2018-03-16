'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var del = require('del');
var runSequence = require('run-sequence');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();


gulp.task('browserSync', function () {
  browserSync.init({
    port: 9000,
    server: {
      baseDir: 'dist'
    }
  })
});

gulp.task('images', function () {
  return gulp.src('src/images/**/*.+(png|jpg|jpeg|gif|svg)')
      .pipe(plugins.imagemin())
      .pipe(gulp.dest('dist/images'))
});

gulp.task('copy', function () {
  gulp.src('src/index.html')
      .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function () {
  return gulp.src([
    'src/scripts/dom-utilities.js',
    'src/scripts/puzzle.js'
  ])
      .pipe(plugins.concat('puzzle.min.js'))
      .pipe(plugins.uglify())
      .pipe(gulp.dest('dist/scripts'));
});


gulp.task('sass', function () {
  return gulp.src('src/styles/scss/**/*.scss')
      .pipe(plugins.sass({
        style: 'expanded'
      }))
      .pipe(plugins.autoprefixer())
      .pipe(plugins.cssnano())
      .pipe(gulp.dest('src/styles/css'))
});

gulp.task('styles', ['sass'], function () {
  return gulp.src([
    'src/styles/css/puzzle.css'
  ])
      .pipe(plugins.concat('puzzle.min.css'))
      .pipe(gulp.dest('dist/styles'))
      .pipe(browserSync.reload({
        stream: true
      }));
});

gulp.task('clean:dist', function () {
  return del.sync(['dist']);
});

gulp.task('clean:dist:dev', function () {
  return del.sync(['dist/**', '!dist', '!dist/images', '!dist/images/**']);
});


gulp.task('build', function (callback) {
  runSequence('clean:dist', ['copy', 'images', 'scripts', 'styles'], callback);
});

gulp.task('build:dev', function (callback) {
  runSequence('clean:dist:dev', ['copy', 'scripts', 'styles'], callback);
});

gulp.task('default', function (callback) {
  runSequence('build:dev', ['browserSync', 'watch'], callback);
});


gulp.task('watch', ['browserSync', 'sass'], function () {
  gulp.watch('src/styles/scss/**/*.scss', ['styles']);
  gulp.watch('src/**/*.html', ['copy', browserSync.reload]);
  gulp.watch('src/scripts/**/*.js', ['scripts', browserSync.reload]);
});


/*Gulp gh-pages deploy script*/
gulp.task('deploy', ['build'], function () {
  return gulp.src('dist/**/*')
      .pipe(plugins.ghPages({
        message: 'Deploy Updates'
      }))
});










