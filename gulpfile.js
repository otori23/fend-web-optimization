var gulp = require('gulp');
var imageResize = require('gulp-image-resize');
var imageop = require('gulp-image-optimization');

var del = require('del');
var runSequence = require('run-sequence');

gulp.task('pizzeria', function () {
	return gulp.src('src/views/images/pizzeria.jpg')
				.pipe(imageResize({ width : 100, height : 75, crop : true, upscale : false}))
				.pipe(imageop({optimizationLevel: 5, progressive: true, interlaced: true}))
				.pipe(gulp.dest('views/images'));
});

gulp.task('images', function(cb) {
    return gulp.src(['src/**/*.png','src/**/*.jpg','src/**/*.gif','src/**/*.jpeg', '!src/views/images/pizzeria.jpg'])
				.pipe(imageop({optimizationLevel: 5, progressive: true, interlaced: true}))
				.pipe(gulp.dest(''));
});

gulp.task('clean', del.bind(null, ['*.html', 'img', 'views'], {dot: true}));

gulp.task('default', ['clean'], function(cb) {
  runSequence(['pizzeria', 'images'], cb);
});