'use strict';

var gulp = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('default', function(done) {
    runSequence('lint', 'checkstyle', 'build', done);
});
