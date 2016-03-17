'use strict';

var gulp = require('gulp'),
    karma = require('karma').server,
    runSequence = require('run-sequence');

gulp.task('test:unit', function (done) {
    runSequence('test:unit:vizzda-lib', 'test:unit:vizzda', done);
});


gulp.task('test:unit:vizzda', function (done) {
    karma.start({
        configFile: __dirname + '/../../test/unit/karma.conf.js',
        singleRun: true,
        reporters: ['spec', 'junit'],
        junitReporter: {
            outputFile: 'test-results-vizzda.xml'
        },
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/angular-ui-router/release/angular-ui-router.js',
            'node_modules/lodash/index.js',
            'node_modules/moment/moment.js',
            'node_modules/moment-timezone/builds/moment-timezone-with-data.js',
            'public/lib/angular-bootstrap/ui-bootstrap-tpls-0.13.0.js',
            'public/src/vizzda-lib/**/*.js',
            'public/src/vizzda/**/*',
            'test/unit/vizzda.specs/**/*.spec.js'
        ],
        exclude: [
            'public/src/vizzda/application/**/*.js',
            'public/src/vizzda-lib/**/*.module.js'
        ],
        preprocessors: {
            'public/src/vizzda/**/*.html': ['ng-html2js']
        },
        ngHtml2JsPreprocessor: {
            // If your build process changes the path to your templates,
            // use stripPrefix and prependPrefix to adjust it.
            stripPrefix: 'public/src',
            // the name of the Angular module to create
            moduleName: 'vizzda.templates'
        }
    }, done);
});

gulp.task('test:unit:vizzda-lib', function (done) {
    karma.start({
        configFile: __dirname + '/../../test/unit/karma.conf.js',
        singleRun: true,
        reporters: ['spec', 'junit'],
        junitReporter: {
            outputFile: 'test-results-vizzda-lib.xml'
        },
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'public/src/vizzda-lib/**/*',
            'test/unit/vizzda-lib.specs/**/*.spec.js'
        ],
        exclude: [
            'public/src/vizzda-lib/**/*.module.js'
        ],
        preprocessors: {
            'public/src/vizzda-lib/**/*.html': ['ng-html2js']
        },
        ngHtml2JsPreprocessor: {
            // If your build process changes the path to your templates,
            // use stripPrefix and prependPrefix to adjust it.
            stripPrefix: 'public/src',
            // the name of the Angular module to create
            moduleName: 'vizzda-lib.templates'
        }
    }, done);
});
