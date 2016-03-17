'use strict';

describe('Browser Info', function () {
    beforeEach(module('vizzda-lib.client.browser-info.service'));

    describe('BrowserInfo service', function () {

        it('should detect browser', inject(function (BrowserInfo) {
            expect(BrowserInfo.browser.isChrome).to.equal(false);
            expect(BrowserInfo.browser.isPhantom).to.equal(true);
        }));
    });
});
