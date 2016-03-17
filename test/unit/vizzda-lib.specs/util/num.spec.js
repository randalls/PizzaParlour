'use strict';

describe('Num Service', function() {

    beforeEach(module('vizzda-lib.util.num.service'));

    describe('range method', function () {
        it('should return an array with a length of 5 when provided a range of 1 to 5', inject(['vzdNum', function (num) {
            expect(num.range(1, 5)).to.have.length(5);
            expect(num.range(1, 5)).to.eql([1, 2, 3, 4, 5]);
        }]));

        it('should return an array [2010, 2012, 2014, 2016] when provided a range of 2010 to 2016 with an increment of 2', inject(['vzdNum', function (num) {
            expect(num.range(2010, 2016, 2)).to.eql([2010, 2012, 2014, 2016]);
        }]));
    });
});
