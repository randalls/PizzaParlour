'use strict';

describe('Alert Service', function() {

    beforeEach(module('vizzda-lib.ui.alert.alert-service'));

    describe('AlertService Provider / config methods', function () {
        var provider;
        beforeEach(module(['vzdAlertServiceProvider', function (AlertServiceProvider) {
            provider = AlertServiceProvider;
        }]));

        it('should allow you to set default parameters for all new alerts', inject(['vzdAlertService', function (alerts) {
            provider.setDefault('type', 'error');
            expect(alerts.getDefaults().type).to.eql('error');

            provider.setDefaults({title: 'foo', body: 'bar', type: 'info'});
            expect(alerts.getDefaults().title).to.eql('foo');
            expect(alerts.getDefaults().body).to.eql('bar');
            expect(alerts.getDefaults().type).to.eql('info');
        }]));

        it('should allow you to set a default configuration for alerts', inject(['vzdAlertService', function (alerts) {
            provider.setConfigParam('timeout', 1000);
            expect(alerts.getConfig().timeout).to.eql(1000);

            provider.setConfig({latestFirst: false, maxDisplayed: 2});
            expect(alerts.getConfig().latestFirst).to.eql(false);
            expect(alerts.getConfig().maxDisplayed).to.eql(2);
        }]));
    });

    describe('add method', function () {

        beforeEach(module(['vzdAlertServiceProvider', function (AlertServiceProvider) {
            AlertServiceProvider.setDefaults({type: 'success'});
        }]));

        it('should broadcast an event on rootScope with default parameters', inject(['$rootScope', 'vzdAlertService', function ($scope, alerts) {
            var spy = sinon.spy($scope, '$broadcast'),
                options = {};

            alerts.add(options);
            $scope.$digest();
            expect(spy.called).to.be.true;
            expect(spy.calledWith('alert:add', angular.extend(alerts.getDefaults(), options))).to.be.true;
        }]));

        it('should broadcast an event on rootScope with supplied parameters', inject(['$rootScope', 'vzdAlertService', function ($scope, alerts) {
            var spy = sinon.spy($scope, '$broadcast'),
                options = {
                    type: 'success',
                    title: 'blah',
                    body: 'foo'
                };

            alerts.add(options);
            $scope.$digest();
            expect(spy.called).to.be.true;
            expect(spy.calledWith('alert:add', angular.extend(alerts.getDefaults(), options))).to.be.true;
        }]));
    });

    describe('clear method', function () {
        it('should broadcast an event on rootScope to clear alerts', inject(['$rootScope', 'vzdAlertService', function ($scope, alerts) {
            var spy = sinon.spy($scope, '$broadcast');
            alerts.clear();
            $scope.$digest();
            expect(spy.called).to.be.true;
            expect(spy.calledWith('alert:clear')).to.be.true;
        }]));
    });

});
