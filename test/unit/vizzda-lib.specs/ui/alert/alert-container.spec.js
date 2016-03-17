'use strict';

describe('Alert-Container Directive', function() {
    beforeEach(function() {
        module('vizzda-lib.ui.alert.alert-container.dir');
        module('vizzda-lib.ui.alert.alert.dir');
        module(['vzdAlertServiceProvider', function (provider) {
            provider.setConfigParam('maxDisplayed', 2);
        }]);
        module('vizzda-lib.templates');
    });

    var $scope, element, elementScope;

    var alert = {
            type: 'info',
            title: 'Title',
            body: 'Body',
            onClick: angular.noop,
            onTimeout: angular.noop,
            onClose: angular.noop,
            onShow: angular.noop,
            closeOnClick: true,
            closeButton: true,
            timeout: 5000
        };

    beforeEach(inject(['$compile', '$rootScope', function($compile, $rootScope) {
        $scope = $rootScope.$new();
        element = $compile('<div vzd-alert-container></div>')($scope);
        elementScope = element.scope();
        $rootScope.$digest();
    }]));

    it('should add a new alert object to scope when the alert:add event is broadcast', inject(['$rootScope', function ($rootScope) {
        $rootScope.$broadcast('alert:add', alert);
        $rootScope.$digest();
        expect(elementScope.alertCtrl.alerts[0]).to.eql(alert);
    }]));

    it('should remove all alerts alert:clear event is broadcast', inject(['$rootScope', function ($rootScope) {
        $rootScope.$broadcast('alert:add', alert);
        $rootScope.$digest();
        $rootScope.$broadcast('alert:clear');
        $rootScope.$digest();
        expect(elementScope.alertCtrl.alerts).to.eql([]);
    }]));

    it('should only display the "maxDisplayed" number of alerts', inject(['$rootScope', function ($rootScope) {
        $rootScope.$broadcast('alert:add', angular.copy(alert));
        $rootScope.$digest();
        $rootScope.$broadcast('alert:add', angular.copy(alert));
        $rootScope.$digest();
        $rootScope.$broadcast('alert:add', angular.copy(alert));
        $rootScope.$digest();
        expect(elementScope.alertCtrl.alerts.length).to.eql(2);
    }]));

    it('should display the alerts in the order provided in the configuration', inject(['$rootScope', function ($rootScope) {
        expect(elementScope.alertCtrl.reverse).to.eql(true);
    }]));
});
