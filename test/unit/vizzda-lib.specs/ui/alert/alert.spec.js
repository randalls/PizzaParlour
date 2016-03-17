'use strict';

describe('Alert Directive', function() {

    beforeEach(function() {
        module('vizzda-lib.ui.alert.alert.dir');
        module(['vzdAlertServiceProvider', function (provider) {
            provider.setConfigParam('maxDisplayed', 2);
        }]);
        module('vizzda-lib.templates');
    });

    function getAlert(opts) {
        return angular.extend({
            type: 'info',
            title: 'Title',
            body: 'Body',
            onClick: angular.noop,
            onTimeout: angular.noop,
            onClose: angular.noop,
            onShow: angular.noop,
            closeOnClick: true,
            closeButton: true,
            timeout: 0
        }, opts);
    }

    var $scope, element, elementScope, alertElement;

    beforeEach(inject(['$compile', '$rootScope', function($compile, $rootScope) {
        $scope = $rootScope.$new();
        element = $compile('<div vzd-alert-container></div>')($scope);
        elementScope = element.scope();
        $rootScope.$digest();
    }]));

    it('should display an alert element', function () {
        $scope.$broadcast('alert:add', getAlert());
        $scope.$digest();
        alertElement = element.find('vzd-alert')[0];

        expect(alertElement).to.exist;
    });

    it('should display an icon with the provided icon class', function () {
        $scope.$broadcast('alert:add', getAlert({icon: 'blah'}));
        $scope.$digest();
        alertElement = element.find('vzd-alert');

        expect(alertElement.find('i')).to.exist;
        expect(alertElement.find('i').hasClass('blah')).to.exist;
    });

    it('should display the provided title', function () {
        $scope.$broadcast('alert:add', getAlert({title: 'blah'}));
        $scope.$digest();
        alertElement = element.find('vzd-alert');

        expect(alertElement.text().search('blah')).to.not.eql(-1);
    });

    it('should display the provided body', function () {
        $scope.$broadcast('alert:add', getAlert({body: 'blah'}));
        $scope.$digest();
        alertElement = element.find('vzd-alert');

        expect(alertElement.text().search('blah')).to.not.eql(-1);
    });

    it('should use the provided type class', function () {
        $scope.$broadcast('alert:add', getAlert({type: 'error'}));
        $scope.$digest();
        alertElement = element.find('vzd-alert');

        expect(alertElement.children().hasClass('vzd-alert-error')).to.be.true;
    });
});

/*
<div class="vzd-alert vzd-alert-{{ alert.type }}">
    <div class="vzd-alert-icon-container">
        <i class="{{ alert.icon }}"></i>
    </div>
    <div class="vzd-alert-title" ng-bind="alert.title"></div>
    <div class="vzd-alert-body" ng-bind="alert.body"></div>
</div>
*/
