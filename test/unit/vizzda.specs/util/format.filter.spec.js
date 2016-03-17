'use strict';

describe('Format Filter', function() {

    var sampleDate = '2015-06-11T15:58:33-07:00',
        formatIn = 'YYYY-MM-DDTHH:mm:ssZ',
        formatOut = 'M/D/YYYY';

    beforeEach(function () {
        module('vizzda.util.format.filter', function ($provide, $filterProvider) {
            $provide.factory('moment', function() {
                return moment;
            });

            $provide.constant('DEFAULT_DATE_FORMAT', formatIn);

            $filterProvider.register('moment', function() {
                return function(input, format) {
                    return moment.utc(input, formatIn).format(format || formatOut);
                };
            });
        });
    });

    xit('should format a number with commas when a number is provided',  inject(['formatFilter', function (filter) {
        expect(filter(2000)).to.eql('2,000');
    }]));

    xit('should return the input capitalized when a string is provided',  inject(['formatFilter', function (filter) {
        expect(filter('blah')).to.eql('Blah');
    }]));

    xit('should return a date string formatted to the default "m/d/yyyy"',  inject(['formatFilter', function (filter) {
        expect(filter(sampleDate)).to.eql('6/11/2015');
    }]));

    xit('should return a date string formatted to the provided moment.js format',  inject(['formatFilter', function (filter) {
        expect(filter(sampleDate, 'MMMM Do YYYY, h:mm:ss a')).to.eql('June 11th 2015, 10:58:33 pm');
    }]));
});
