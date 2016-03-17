var config = require('../../config')('selenium'),
    nconf = require('nconf'),
    host = nconf.get('host');

exports.config = {
    seleniumServerJar: null,
    seleniumPort: null,
    seleniumArgs: [],
    chromeDriver: '../../node_modules/chromedriver/bin/chromedriver',
    directConnect: true,
    seleniumAddress: null,
    sauceUser: null,
    sauceKey: null,
    exclude: [],
    suites: {},
    capabilities: {
        browserName: 'chrome',
        count: 1,
        shardTestFiles: false,
        maxInstances: 1,
        specs: []
    },
    maxSessions: -1,
    baseUrl: 'http://' + host.name + ':' + host.port,
    rootElement: 'body',
    allScriptsTimeout: 11000,
    getPageTimeout: 10000,
    framework: 'jasmine',
    jasmineNodeOpts: {
        isVerbose: true,
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 30000
    }
};
