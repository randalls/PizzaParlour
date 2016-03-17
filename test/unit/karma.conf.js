'use strict';

module.exports = function (config) {
    config.set({
        basePath: '../../',
        frameworks: [
            'mocha',
            'chai',
            'sinon-chai',
            'chai-as-promised'
        ],
        browsers: [
            'PhantomJS'
        ],
        reporters: [
            'spec'
        ],
        plugins: [
            'karma-*'
        ],
        port: 9876,
        colors: true,
        autoWatch: false,
        singleRun: false,
        logLevel: config.LOG_INFO
    });
};
