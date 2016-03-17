'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('build:vendor', function () {
    var files = [
            'node_modules/angular/angular.js',
            'node_modules/angular-touch/angular-touch.js',
            'node_modules/angular-sanitize/angular-sanitize.js',
            'node_modules/angular-cookies/angular-cookies.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-messages/angular-messages.js',
            'node_modules/angular-aria/angular-aria.js',
            'node_modules/angular-google-maps/dist/angular-google-maps.js',
            'node_modules/angular-ui-router/release/angular-ui-router.js',
            'node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.js',
            'node_modules/angular-simple-logger/dist/angular-simple-logger.light.js',
            'node_modules/ng-tags-input/build/ng-tags-input.js',
            'node_modules/lodash/index.js',
            'public/lib/angular-slideables/angularSlideables.js'
        ];

    gulp.src(files)
        .pipe(sourcemaps.init())
        .pipe(concat('pizza-vendor.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('../target/maps'))
        .pipe(gulp.dest('public/target/'));
});
