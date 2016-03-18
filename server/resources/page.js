'use strict';

var pages = require('../controller/page'),
    express = require('express');

module.exports = function () {

    var pageRoutes = express.Router();

    pageRoutes.get('/', pages.index);
    pageRoutes.get('/home', pages.index);
    pageRoutes.get('/menu', pages.index);
    pageRoutes.get('/create?', pages.index);


    return pageRoutes;
};
