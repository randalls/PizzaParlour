//node_modules/.bin/webdriver-manager update


var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    protractor = require('gulp-protractor').protractor,
    configPath = 'test/e2e/protractor.conf.js',
    server = require('gulp-express'),
    stream;

gulp.task('test:e2e', function (done) {
    runSequence('server:start', 'protractor', 'server:stop', done);
});

gulp.task('server:start', function () {
    var opts = {};
    opts.env = process.env;
    opts.env.NODE_ENV = 'selenium';
    server.run(['server.js'], opts, false);
});

gulp.task('server:stop', function () {
    server.stop();
});

gulp.task('protractor', function () {
    return gulp.src([
            'test/e2e/**/*.spec.js',
            'test/e2e/mock/**/*.pg.js'
        ])
        .pipe(
            protractor({
                configFile: configPath
            })
        )
        .on('error', function(e) {
            server.stop();
            throw e;
        });
});
