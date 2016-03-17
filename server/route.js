'use strict';

var express = require('express'),
    index = require('./controller/page');

module.exports = function (app) {

    var router = express.Router();

    router.use(require('./util/locale')({language: 'en'}));

    router.use(require('./resources/page')());
    router.use(require('./resources/mocks')());
    router.use(require('./resources/redirect')());

    router.use(function(req, res) {
        res.status(404).render('index', index.locals(req));
    });

    app.use('/', router);
};
