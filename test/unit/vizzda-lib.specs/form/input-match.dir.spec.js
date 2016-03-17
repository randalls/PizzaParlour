'use strict';

describe('Input Match', function() {

    beforeEach(function() {
        module('vizzda-lib.form.input-match.dir');
    });

    var $scope, element, elementScope;

    beforeEach(inject(function($compile, $rootScope) {
        $scope = $rootScope.$new();
        $scope.values = {
            value1: 'foo',
            value2: null
        };
        element = $compile('<form name="testForm"><input type="text" vzd-input-match="values.value1" ng-model="values.value2" name="test"></form>')($scope);
        elementScope = element.scope();
        $rootScope.$digest();
    }));

    it('should validate the input field if supplied values match', function (done) {
        $scope.testForm.test.$setViewValue('foo');
        $scope.$digest();
        expect($scope.values.value2).to.eql('foo');
        done();
    });

    it('should invalidate the input field if supplied values do not', function (done) {
        $scope.testForm.test.$setViewValue('baz');
        $scope.$digest();
        expect($scope.values.value2).to.be.undefined;
        expect($scope.testForm.test.$valid).to.be.false;
        done();
    });
});
