var gulp = require('gulp');
var chalk = require('chalk');
var rename = require('gulp-rename');

var connect = require('gulp-connect');

var pug = require('gulp-pug');
var sass = require('gulp-sass');
var minifyCss = require ('gulp-minify-css');

var getTime = function() {
	let now = new Date();
	let hour = now.getHours();
	let minutes = now.getMinutes() > 9 ? now.getMinutes() : `0${now.getMinutes()}`;
	let seconds = now.getSeconds() > 9 ? now.getSeconds() : `0${now.getSeconds()}`;
	return `${hour}:${minutes}:${seconds}`;
};

gulp.task('connect', function() {
	connect.server({
		root: 'dist',
		livereload: true
	});
});

gulp.task('pug', function () {
	console.log('['+ chalk.grey(getTime()) +'] Compiling \'' +chalk.cyan('pug') + '\'');
	return gulp.src('./src/index.pug')
  .pipe(pug())
  .pipe(gulp.dest('./dist/'))
  .pipe(connect.reload());
});

gulp.task('sass', function () {
	console.log('['+ chalk.grey(getTime()) +'] Compiling \'' +chalk.cyan('sass') + '\'');	
	return gulp.src('./src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css/'))
		.pipe(minifyCss({keepSpecialComments: 0}))
		.pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest('./dist/css/'))		
		.pipe(connect.reload());
});

gulp.task('js', function () {
	console.log('['+ chalk.grey(getTime()) +'] Compiling \'' +chalk.cyan('js') + '\'');	
	return gulp.src('./src/js/*.js')
    .pipe(gulp.dest('./dist/js/'))
		.pipe(connect.reload());
});

gulp.task('watch', function () {
	gulp.watch(['./src/**/*.pug'], ['pug']);
	gulp.watch(['./src/**/*.scss'], ['sass']);
	gulp.watch(['./src/**/*.js'], ['js']);
});

gulp.task('default', ['connect', 'pug', 'sass', 'js', 'watch']);