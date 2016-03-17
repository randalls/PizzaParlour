'use strict';

describe('No Whitespace Filter', function() {

    var sampleDate = '2015-06-11T15:58:33-07:00',
        invalidDate = 'blah blah';

    beforeEach(function () {
        module('vizzda.util.nowhitespace.filter', function ($provide, $filterProvider) {
            $provide.factory('lodash', function() {
                return _;
            });
        });
    });

    it('should replace whitespace in a provided string with the default "camelCase", so that "blah blah blah should be blahBlahBlah"',  inject(['nowhitespaceFilter', function (filter) {
        expect(filter('blah blah blah')).to.eql('blahBlahBlah');
    }]));

    it('should replace whitespace in a provided string using the provided lodash function "kebabCase", so that "blah blah blah should be blah-blah-blah"',  inject(['nowhitespaceFilter', function (filter) {
        expect(filter('blah blah blah', 'kebabCase')).to.eql('blah-blah-blah');
    }]));
});
