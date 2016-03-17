'use strict';

var nconf = require('nconf');

exports.index = function (req, res) {
    res.render('index', exports.locals(req));
};

exports.locals = function (req) {
    var languages = req.acceptsLanguages(),
        defaultLanguage = (languages.length) ? languages[0].toLowerCase() : nconf.get('defaultLocale');
    return {
        title: 'Flippin Pizza',
        base: '',
        api: nconf.get('api'),
        local: (req.query.local === 'false') ? false : nconf.get('NODE_ENV'),
        locale: defaultLanguage,
        og: {
            title: 'Pizza!',
            type: 'website',
            descr: 'Try our Pizza or build your own!',
            name: 'Pizza',
            url: 'https://www.flippinpizza.com',
            app: '174737102622035'
        }
    };
};
