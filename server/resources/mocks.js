'use strict';

var mocks = require('../controller/mocks'),
    express = require('express');

module.exports = function () {

    var mockRoutes = express.Router();
    mockRoutes.get('/tag/?*', mocks.tag);
    mockRoutes.get('/notes/?*', mocks.note);
    mockRoutes.get('/properties/search/?*', mocks.property);
    mockRoutes.get('/dailies/search/?*', mocks.dailies);
    mockRoutes.get('/companies/search/?*', mocks.companies);

    return mockRoutes;
};
