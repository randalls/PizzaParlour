'use strict';

describe('lodash Service', function() {

    var sampleDate = '2015-06-11T15:58:33-07:00',
        invalidDate = 'blah blah';

    beforeEach(module('lodash.js'));

    it('should return the global variable provided by lodash.js',  inject(['lodash', function (_) {
        expect(_).to.be.a('function');
    }]));
});
