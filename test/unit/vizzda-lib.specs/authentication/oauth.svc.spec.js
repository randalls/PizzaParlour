'use strict';

describe('OAuth Service', function() {

    var apiMap = {
            register: '/register',
            login: '/login',
            associate: '/associate',
            getLocalToken: '/getLocalToken',
            external: '/externalLogin'
        },
        clientId = 'VizzdaApp';

    beforeEach(function () {
        module('vizzda-lib.authentication.oauth.service', function ($provide) {
            $provide.factory('vzdConnectWindow', function($q) {
                return {
                    open: function(provider, client) {
                        return $q.resolve({provider: provider, client: client});
                    }
                };
            });

            $provide.factory('vzdApi', function($http) {
                return $http;
            });
        });
    });

    beforeEach(module(['vzdOAuthProvider', function (OAuthProvider) {
        OAuthProvider.setClient(clientId);
        OAuthProvider.setApiMap(apiMap);
    }]));

    describe('"login" method', function () {
        var loginSuccess = {
            ".expires": "Mon, 13 Apr 2015 17:54:49 GMT",
            ".issued": "Mon, 13 Apr 2015 17:24:49 GMT",
            "access_token": "blahblahblah",
            "as:client_id": "VizzdaApp",
            "expires_in": 1799,
            "refresh_token": "be6aa7a2d4d1433088bf9a85b9831995",
            "role": "SystemAdministrator",
            "token_type": "bearer",
            "userId": "3f2b5402-20b4-4206-a97c-ad202a670f8a",
            "userName": "rshimkus@vizzda.com"
        };

        var OAuth, $httpBackend;

        beforeEach(inject(['vzdOAuth', '$httpBackend', function (_OAuth_, _$httpBackend_) {
            OAuth = _OAuth_;
            $httpBackend = _$httpBackend_;
        }]));

        it('should retrieve a token', function (done) {
            var promise = OAuth.login('foo', 'bar', false);
            $httpBackend.whenPOST('/login').respond(loginSuccess);
            promise.then(function (response) {
                expect(response).to.contain.all.keys('access_token', 'role', 'userId', 'userName', '.expires', '.issued', 'refresh_token');
                done();
            });
            $httpBackend.flush();
        });
    });
});
