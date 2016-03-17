var gulp = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('build', function (done) {
    'use strict';
    runSequence(
        'clean',
        'build:less',
        'build:vendor',
        'build:pizza-lib',
        'build:pizza-src',
        'build:pizza-app',
        'copy:i18n',
        'copy:components',
        'optimize:image',
        done
    );
});
