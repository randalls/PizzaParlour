var fs = require('fs'),
    path = require('path'),
    glob = require('glob'),
    _ = require('lodash'),
    nconf = require('nconf');

module.exports = function locale (config) {
    var defaultLanguage = nconf.get('defaultLocale');

    function getFiles() {
        var list = glob.sync('./public/asset/locale/**/*.json'),
            files = {},
            absPath, locale;

        _.each(list, function (p) {
            absPath = path.resolve(p, '');
            locale = path.basename(p, '.json');

            files[locale] = JSON.stringify(require(absPath));
        });

        return files;
    }

    return function (req, res, next) {
        var files = getFiles(),
            languages = req.acceptsLanguages(),
            lang = _.find(languages, function (l) {
                if (!l) { return; }
                return files.hasOwnProperty(l.toLowerCase());
            }),
            file;

        lang = (lang) ? lang.toLowerCase() : defaultLanguage;
        file = files[lang];

        res.locals.langFile = file;
        res.locals.locale = lang;
        next();
    };
};
