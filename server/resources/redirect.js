'use strict';

var express = require('express');

module.exports = function () {

    var redirectRoutes = express.Router();

    redirectRoutes.get('/login', function (req, res) {
        res.redirect('https://www2.vizzda.com/login');
    });

    return redirectRoutes;
};
