// Gulpfile.js
var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('develop', function () {
    'use strict';
    
    nodemon({
        script: 'server.js',
        ext: 'js json',
        watch: [
            'public/asset/locale/**/*',
            'server/**/*',
            'server.js',
            'config/**/*'
        ]
    })
    .on('change', [])
    .on('restart', function () {
        console.log('restarted!');
    });
});
