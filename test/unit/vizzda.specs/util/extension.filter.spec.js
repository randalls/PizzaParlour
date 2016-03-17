'use strict';

describe('Extension Filter', function() {

    beforeEach(module('vizzda.util.extension.filter'));

    it('should return the extension of a file based on the provided filename',  inject(['extensionFilter', function (extensionFilter) {
        expect(extensionFilter('blah.pdf')).to.eql('pdf');
    }]));

    it('should return "undefined" if an invalid string is passed for the filename',  inject(['extensionFilter', function (extensionFilter) {
        expect(extensionFilter('blah')).to.be.undefined;
    }]));
});
