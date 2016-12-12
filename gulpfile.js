const gulp = require('gulp');
const gutil = require('gulp-util');
const chalk = require('chalk');
const rename = require('gulp-rename');

const connect = require('gulp-connect');

const pug = require('gulp-pug');

const postcss = require('gulp-postcss');
const sass = require('gulp-sass');

const getTime = function () {
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
		.pipe(postcss([require('autoprefixer')]))
		.pipe(gulp.dest('./dist/css/'))
		.pipe(postcss([require('cssnano')]))
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