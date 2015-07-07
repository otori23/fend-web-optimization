var gulp = require('gulp');

gulp.task('hello', function() {
	console.log('Hello Gulp!!!');
});

gulp.task('default', ['hello']);