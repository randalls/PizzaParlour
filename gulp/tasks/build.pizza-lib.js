'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    templateCache = require('gulp-angular-templatecache');

gulp.task('build:pizza-lib', ['build:templates:pizza-lib'], function () {
    var files = [
            'public/src/pizza-lib/**/*.js'
        ];

    return gulp.src(files)
        .pipe(sourcemaps.init())
        .pipe(concat('pizza-lib.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('../target/maps'))
        .on('error', gutil.log)
        .pipe(gulp.dest('public/target/'));
});

gulp.task('build:templates:pizza-lib', function () {
    return gulp.src(
            [
                'public/src/pizza-lib/**/*.html'
            ]
        )
        .pipe(templateCache('pizza-lib-tmpl.js', {
            module: 'pizza-lib.templates',
            standalone: true,
            root: '/pizza-lib/'
        }))
        .on('error', gutil.log)
        .pipe(gulp.dest('public/target/'));
});
