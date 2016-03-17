'use strict';

describe('OAuth External ConnectWindow', function() {

    beforeEach(module('vizzda-lib.authentication.connect-window.service'));

    beforeEach(module(['vzdConnectWindowProvider', function (ConnectWindowProvider) {
        window.open = function () {
            return 'blah';
        };
        ConnectWindowProvider.setRedirectPage([function () {
            return 'blah';
        }]);
    }]));

    it('should be defined', inject(function ($injector) {
        var getService = function () {
            return $injector.get('vzdConnectWindow');
        };
        expect(getService).to.not.throw(Error);
        expect(getService()).to.exist;
    }));

    describe('when the open method is called without the proper parameters', function () {
        it('should return a rejected promise when no clientId is provided', inject(['vzdConnectWindow', function (ConnectWindow) {
            return ConnectWindow.open('Vizzda').should.be.rejected;
        }]));

        it('should return a rejected promise when no provider is provided', inject(['vzdConnectWindow', function (ConnectWindow) {
            return ConnectWindow.open(null, 'Vizzda').should.be.rejected;
        }]));
    });

    describe('when the open method is called with the proper parameters', function () {
        it('should open an external window', inject(['vzdConnectWindow', '$window', function (ConnectWindow, $window) {
            var spy = sinon.spy($window, 'open');
            ConnectWindow.open('Facebook', 'VizzdaApp');
            expect(spy.called).to.be.true;
        }]));
    });
});
