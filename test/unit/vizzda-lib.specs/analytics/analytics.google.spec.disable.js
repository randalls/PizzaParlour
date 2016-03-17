describe('Analytics: Google service', function(){
    beforeEach(module('vizzda-lib.analytics.google.service'));

    it('should be defined', inject(['vzdGoogleAnalytics', function(GoogleAnalytics){
        expect(GoogleAnalytics).to.not.be.undefined;
    }]));

    describe('GA profileId IS NOT provided', function () {

        var spy, ga;

        beforeEach(inject(function ($log) {
            $logSpy = sinon.spy($log, 'warn');
        }));

        it('should warn a user when a profile id is not defined', inject(function(GoogleAnalytics){
            expect($logSpy.called).to.be.true;
        }));

        it('should not send tracking events', inject(function($window, GoogleAnalytics){
            console.log($window.ga);
            expect($logSpy.called).to.be.true;
        }));
    });

    describe('GA profileId IS provided', function () {

        var spy, ga;

        beforeEach(function () {
            module(function(GoogleAnalyticsProvider) {
                GoogleAnalyticsProvider.setProfile('UA-54831506-1');
            });
        });

        it('should not warn a user when a profile id is defined', function(){

            inject(function($injector, $log) {
                spy = sinon.spy($log, 'warn');
                ga = $injector.get('vzdGoogleAnalytics');
            });

            expect(spy.called).to.be.false;
        });

        //it('')
    });
});
