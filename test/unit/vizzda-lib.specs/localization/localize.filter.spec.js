describe('Localization: localize-filter', function(){
    beforeEach(module('vizzda-lib.localization.localize.fltr'));

    it('should get translation based on message code', inject(['vzdLocalizeFilter', 'vzdMessages', function(localizeFilter, _Messages_){
        sinon.spy(_Messages_, 'getMessage');
        localizeFilter('code.subcode');
        expect(_Messages_.getMessage.calledWith('code.subcode')).to.be.true;
    }]));

    it('should get translation with interpolated values if optional array argument is defined', inject(['vzdLocalizeFilter', 'vzdMessages', function(localizeFilter, _Messages_){
        sinon.spy(_Messages_, 'getInterpolatedMessage');
        localizeFilter('code.subcode', ['value']);
        expect(_Messages_.getInterpolatedMessage.calledWith('code.subcode', ['value'])).to.be.true;
    }]));

    it('should not get translation with interpolate values if array argument is null or undefined', inject(['vzdLocalizeFilter', 'vzdMessages', function(localizeFilter, _Messages_){
        sinon.spy(_Messages_, 'getInterpolatedMessage');
        sinon.spy(_Messages_, 'getMessage');

        localizeFilter('code.subcode', []);
        expect(_Messages_.getInterpolatedMessage.called).to.be.false;

        localizeFilter('code.subcode', null);
        expect(_Messages_.getInterpolatedMessage.called).to.be.false;

        expect(_Messages_.getMessage.calledWith('code.subcode')).to.be.true;
        expect(_Messages_.getMessage.callCount).to.equal(2);
    }]));

    it('should return empty string if null, empty string or undefined are passed as arguments', inject(['vzdLocalizeFilter', function(localizeFilter){
        expect(localizeFilter('')).to.equal('');
        expect(localizeFilter(null)).to.equal('');
        expect(localizeFilter(undefined)).to.equal('');
    }]));

    it('should throw an error if non-string argument is passed', inject(['vzdLocalizeFilter', function(localizeFilter){
        var nonStringInput = 1,
            nonStringInputTest = function () {
                return localizeFilter(nonStringInput);
            };
        expect(nonStringInputTest).to.throw(TypeError, /Unexpected argument type/);
    }]));
});
