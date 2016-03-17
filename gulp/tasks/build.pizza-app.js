'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    templateCache = require('gulp-angular-templatecache');

gulp.task('build:pizza-app', function () {
    var files = [
            'public/src/application/**/*.js'
        ];

    return gulp.src(files)
        .pipe(sourcemaps.init())
        .pipe(concat('pizza-app.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('../target/maps'))
        .on('error', gutil.log)
        .pipe(gulp.dest('public/target/'));
});

gulp.task('build:templates:pizza-app', function () {
    return gulp.src(
            [
                'public/src/application/**/*.html'
            ]
        )
        .pipe(templateCache('pizza-app-tmpl.js', {
            module: 'pizza-app.templates',
            standalone: true,
            root: '/application/'
        }))
        .on('error', gutil.log)
        .pipe(gulp.dest('public/target/'));
});
