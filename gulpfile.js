var gulp = require('gulp');
var gutil = require('gulp-util');
var chalk = require('chalk');
var rename = require('gulp-rename');

var connect = require('gulp-connect');

var pug = require('gulp-pug');


var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

var getTime = function () {
	let now = new Date();
	let hour = now.getHours();
	let minutes = now.getMinutes() > 9 ? now.getMinutes() : `0${now.getMinutes()}`;
	let seconds = now.getSeconds() > 9 ? now.getSeconds() : `0${now.getSeconds()}`;
	return `${hour}:${minutes}:${seconds}`;
};

gulp.task('connect', function () {
	connect.server({
		root: '',
		livereload: true
	});
});

gulp.task('pug', function () {
	console.log('[' + chalk.grey(getTime()) + '] Compiling \'' + chalk.cyan('pug') + '\'');
	return gulp.src('./src/index.pug')
		.pipe(pug().on('error', gutil.log))
		.pipe(gulp.dest('./'))
		.pipe(connect.reload());
});

gulp.task('postcss', function () {
	console.log('[' + chalk.grey(getTime()) + '] Compiling \'' + chalk.cyan('postcss') + '\'');
	return gulp.src('./src/sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss([autoprefixer]))
		.pipe(gulp.dest('./dist/css/'))
		.pipe(postcss([cssnano]))
		.pipe(rename({extname: '.min.css'}))
		.pipe(gulp.dest('./dist/css/'))
		.pipe(connect.reload());
});

gulp.task('js', function () {
	console.log('[' + chalk.grey(getTime()) + '] Compiling \'' + chalk.cyan('js') + '\'');
	return gulp.src('./src/js/*.js')
		.pipe(gulp.dest('./dist/js/'))
		.pipe(connect.reload());
});

gulp.task('watch', function () {
	gulp.watch(['./src/**/*.pug'], ['pug']);
	gulp.watch(['./src/**/*.scss'], ['postcss']);
	gulp.watch(['./src/**/*.js'], ['js']);
});

gulp.task('default', ['connect', 'pug', 'postcss', 'js', 'watch']);