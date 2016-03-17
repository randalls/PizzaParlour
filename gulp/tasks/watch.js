'use strict';
// Gulpfile.js
var gulp = require('gulp');

gulp.task('watch', ['build'], function () {
    // less
    gulp.watch(['public/style/less/**/*.less'], ['build:less']);

    // javascript
    gulp.watch(['public/src/pizza/**/*.js'], ['build:pizza-src']);
    gulp.watch(['public/src/pizza-lib/**/*.js'], ['build:pizza-lib']);
    gulp.watch(['public/src/application/**/*.js'], ['build:pizza-app']);

    // libs
    gulp.watch(['gulp/tasks/build.lib.js'], ['build:lib']);
    gulp.watch(['public/lib/**/*.js'], ['build:lib']);

    // templates
    gulp.watch(['public/src/pizza/**/*.html'], ['build:templates:pizza-src']);
    gulp.watch(['public/src/pizza-lib/**/*.html'], ['build:templates:pizza-lib']);

    // copy
    gulp.watch(['public/assets/locale/**/*.json'], ['build:copy']);

    // images
    gulp.watch(['public/assets/image/**/*'], ['optimize:image']);
});
