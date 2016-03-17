'use strict';

describe('Avatar Directive', function() {

    beforeEach(function () {
        module('vizzda.user.avatar.dir');
        module('vizzda.templates')
    });

    var $scope, element, elementScope;

    var user = {
            firstName: 'Ryan',
            lastName: 'Mathis'
        };

    beforeEach(inject(['$compile', '$rootScope', function($compile, $rootScope) {
        $scope = $rootScope.$new();
        $scope.user = user;
        element = $compile('<avatar first="user.firstName" last="user.lastName"></avatar>')($scope);
        elementScope = element.scope();
        $rootScope.$digest();
    }]));

    xit('should display the user\'s initials', function () {
        var elm = element.find('a');
        expect(elm.html()).to.contain('RM');
    });
});

/*
<a class="avatar" ui-sref="contact.detail({userId: avatarCtrl.user.userId})">{{ avatarCtrl.initials }}</a>
*/
