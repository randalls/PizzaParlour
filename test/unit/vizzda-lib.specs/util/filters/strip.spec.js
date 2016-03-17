'use strict';

describe('Strip Filter', function() {

    beforeEach(module('vizzda-lib.util.filters.strip'));

    it('should strip characters supplied in an array from the input string', inject(['vzdStripFilter', function (strip) {
        expect(strip('p&z', ['&'])).to.eql('pz');
        expect(strip('p&z*C!', ['&'])).to.eql('pz*C!');
        expect(strip('p&z*C!', ['&', '*', '!'])).to.eql('pzC');
    }]));
});
