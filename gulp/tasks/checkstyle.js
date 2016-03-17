var gulp = require('gulp'),
    jscs = require('gulp-jscs');

gulp.task('checkstyle', function() {
    'use strict';

    return gulp.src(['public/src/pizza/**/*.js', 'public/src/pizza-lib/**/*.js'])
        .pipe(jscs('.jscsrc'));
});
