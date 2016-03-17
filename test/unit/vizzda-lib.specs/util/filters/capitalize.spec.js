'use strict';

describe('Capitalize Filter', function() {

    beforeEach(module('vizzda-lib.util.filters.capitalize'));

    it('should capitalize the first letter of the first word and lowercase the rest of the input', inject(['vzdCapitalizeFilter', function (caps) {
        expect(caps('ALABAMA')).to.eql('Alabama');
        expect(caps('alabama')).to.eql('Alabama');
        expect(caps('rose is adorable')).to.eql('Rose is adorable');
    }]));
});
