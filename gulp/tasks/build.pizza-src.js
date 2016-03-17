'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil = require('gulp-util'),
    templateCache = require('gulp-angular-templatecache');

gulp.task('build:pizza-src', ['build:templates:pizza-src'], function () {
    var files = [
            'public/src/pizza/**/*.js'
        ];

    gulp.src(files)
        .pipe(sourcemaps.init())
        .pipe(concat('pizza-src.js'))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('../target/maps'))
        .pipe(gulp.dest('public/target/'));
});

gulp.task('build:templates:pizza-src', function () {
    return gulp.src(
            [
                'public/src/pizza/**/*.html'
            ]
        )
        .pipe(templateCache('pizza-src-tmpl.js', {
            module: 'pizza-app.templates',
            standalone: true,
            root: '/pizza/'
        }))
        .on('error', gutil.log)
        .pipe(gulp.dest('public/target/'));
});
