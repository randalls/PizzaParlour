var gulp = require('gulp'),
    less = require('gulp-less'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('build:less', ['copy:css'], function () {
    'use strict';

    return gulp.src('./public/style/less/app.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 5%', 'ie < 10'],
            cascade: false
        }))
        .on('error', gutil.log)
        .pipe(sourcemaps.write('../../maps'))
        .pipe(gulp.dest('./public/target/style/css'));
});
