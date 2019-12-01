const gulp = require('gulp');
const gutil = require('gulp-util');
const chalk = require('chalk');
const rename = require('gulp-rename');

const connect = require('gulp-connect');

const pug = require('gulp-pug');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const cssnano = require('cssnano');

const autoprefixer = require('autoprefixer');

function getTime() {
   const now = new Date();
   const hour = now.getHours();
   const minutes = now.getMinutes() > 9 ? now.getMinutes() : `0${now.getMinutes()}`;
   const seconds = now.getSeconds() > 9 ? now.getSeconds() : `0${now.getSeconds()}`;
   return `${hour}:${minutes}:${seconds}`;
}

function server(done) {
   connect.server({
      root: '',
      livereload: true,
   });
   done();
}

function Pug() {
   console.log(`[${chalk.grey(getTime())}] Compiling '${chalk.cyan('Pug')}'`);
   return gulp
      .src('./src/index.pug')
      .pipe(pug().on('error', gutil.log))
      .pipe(gulp.dest('./'))
      .pipe(connect.reload());
}

function PostCSS() {
   console.log(`[${chalk.grey(getTime())}] Compiling '${chalk.cyan('PostCSS')}'`);
   return gulp
      .src('./src/sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss([autoprefixer]))
      .pipe(gulp.dest('./dist/css/'))
      .pipe(postcss([cssnano]))
      .pipe(rename({ extname: '.min.css' }))
      .pipe(gulp.dest('./dist/css/'))
      .pipe(connect.reload());
}

function JavaScript() {
   console.log(`[${chalk.grey(getTime())}] Compiling '${chalk.cyan('JavaScript')}'`);
   return gulp
      .src('./src/js/*.js')
      .pipe(gulp.dest('./dist/js/'))
      .pipe(connect.reload());
}

function watch() {
   gulp.watch('./src/**/*.pug').on('all', gulp.series(Pug));
   gulp.watch('./src/**/*.scss').on('all', gulp.series(PostCSS));
   gulp.watch('./src/**/*.js').on('all', gulp.series(JavaScript));
}

gulp.task('build', gulp.parallel(Pug, PostCSS, JavaScript));

gulp.task('default', gulp.series('build', server, watch));
