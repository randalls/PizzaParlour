'use strict';

var gulp = require('gulp');

gulp.task('copy:css', function () {
    gulp.src(['./public/style/lib/**/*.css'])
        .pipe(gulp.dest('./public/target/style/lib'));
    gulp.src(['./public/style/fonts/**/*'])
        .pipe(gulp.dest('./public/target/style/fonts'));
    gulp.src(['./node_modules/ui-select/dist/select.css'])
        .pipe(gulp.dest('./public/target/style/lib'));
    gulp.src(['./node_modules/ng-tags-input/build/ng-tags-input.min.css', './node_modules/ng-tags-input/build/ng-tags-input.bootstrap.min.css'])
        .pipe(gulp.dest('./public/target/style/lib'));
});

gulp.task('copy:components', function () {
    gulp.src(['./public/app/components/**/*'])
        .pipe(gulp.dest('./public/target/components'));
    gulp.src(['./node_modules/xdomain/**/*'])
        .pipe(gulp.dest('./public/target/components/xdomain'));
});

gulp.task('copy:i18n', function () {
    return gulp.src(['./node_modules/angular-i18n/**/angular-locale_*.js'])
        .pipe(gulp.dest('./public/target/i18n'));
});
