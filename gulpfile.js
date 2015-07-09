'use strict';

var gulp = require('gulp');
var imageResize = require('gulp-image-resize');
var imageop = require('gulp-image-optimization');
var gutil = require('gulp-util');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');

var del = require('del');
var runSequence = require('run-sequence');
var minimist = require('minimist');

var options = minimist(process.argv);
var environment = options.environment || 'development';

gulp.task('pizzeria', function () {
	return gulp.src('src/**/pizzeria.jpg')
				.pipe(imageResize({ width : 100, height : 75, crop : true, upscale : false}))
				.pipe(imageop({optimizationLevel: 5, progressive: true, interlaced: true}))
				.pipe(gulp.dest(''));
});

gulp.task('images', function(cb) {
    return gulp.src(['src/**/*.png','src/**/*.jpg','src/**/*.gif','src/**/*.jpeg', '!src/views/images/pizzeria.jpg'])
				.pipe(imageop({optimizationLevel: 5, progressive: true, interlaced: true}))
				.pipe(gulp.dest(''));
});

gulp.task('html', function() {
	return gulp.src('src/**/*.html')
		.pipe(environment === 'production' ? minifyHtml() : gutil.noop())
		.pipe(gulp.dest(''));
});

gulp.task('styles', function() {
	return gulp.src('src/**/*.css')
		.pipe(environment === 'production' ? minifyCss() : gutil.noop())
		.pipe(gulp.dest(''));
});

gulp.task('scripts', function() {
	return gulp.src('src/**/*.js')
		.pipe(environment === 'production' ? uglify() : gutil.noop())
		.pipe(gulp.dest(''));
});

gulp.task('clean', del.bind(null, ['*.html', 'css', 'img', 'js', 'views'], {dot: true}));

gulp.task('build', ['default']);

gulp.task('default', ['clean'], function(cb) {
  runSequence(['pizzeria', 'images', 'html', 'styles', 'scripts'], cb);
});