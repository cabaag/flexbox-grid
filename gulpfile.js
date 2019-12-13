const gulp = require("gulp");
const gutil = require("gulp-util");
const chalk = require("chalk");
const rename = require("gulp-rename");

const gulpConnect = require("gulp-connect");

const gulpPug = require("gulp-pug");

const gulpPostcss = require("gulp-postcss");
const gulpSass = require("gulp-sass");

const getTime = function() {
	let now = new Date();
	let hour = now.getHours();
	let minutes =
		now.getMinutes() > 9 ? now.getMinutes() : `0${now.getMinutes()}`;
	let seconds =
		now.getSeconds() > 9 ? now.getSeconds() : `0${now.getSeconds()}`;
	return `${hour}:${minutes}:${seconds}`;
};

function connect(cb) {
	gulpConnect.server({
		root: "",
		livereload: true
	});
	cb();
}

function pug() {
	console.log(
		"[" + chalk.grey(getTime()) + "] Compiling '" + chalk.cyan("pug") + "'"
	);
	return gulp
		.src("./src/index.pug")
		.pipe(gulpPug().on("error", gutil.log))
		.pipe(gulp.dest("./"))
		.pipe(gulpConnect.reload());
}

function postcss() {
	console.log(
		"[" + chalk.grey(getTime()) + "] Compiling '" + chalk.cyan("postcss") + "'"
	);
	return gulp
		.src("./src/sass/*.scss")
		.pipe(gulpSass().on("error", gulpSass.logError))
		.pipe(gulpPostcss([require("autoprefixer")]))
		.pipe(gulp.dest("./dist/css/"))
		.pipe(gulpPostcss([require("cssnano")]))
		.pipe(rename({ extname: ".min.css" }))
		.pipe(gulp.dest("./dist/css/"))
		.pipe(gulpConnect.reload());
}

function javascript() {
	console.log(
		"[" +
			chalk.grey(getTime()) +
			"] Compiling '" +
			chalk.cyan("javascript") +
			"'"
	);
	return gulp
		.src("./src/js/*.js")
		.pipe(gulp.dest("./dist/js/"))
		.pipe(gulpConnect.reload());
}

function watch() {
	gulp.watch("./src/**/*.pug", pug);
	gulp.watch("./src/**/*.scss", postcss);
	gulp.watch("./src/**/*.js", javascript);
}

const build = gulp.parallel(pug, postcss, javascript);
const defaultTask = gulp.parallel(build, watch, connect);

exports.build = build;
exports.default = gulp.series(defaultTask, build);
