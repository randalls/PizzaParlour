var gulp = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('test', function (done) {
    runSequence('test:unit', 'test:e2e', done);
});
