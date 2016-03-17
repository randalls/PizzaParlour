'use strict';

describe('Role Service', function() {

    beforeEach(module('vizzda-lib.authorization.role.service'));

    beforeEach(module(['vzdRoleProvider', function (RoleProvider) {
        RoleProvider.setAuthorizationMethod([function () {
            return true;
        }]);
    }]));

    describe('Role checking method is provided', function () {

    });
});
