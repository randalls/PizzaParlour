'use strict';

describe('Session Service', function() {

    beforeEach(module('vizzda-lib.authentication.session.service'));

    describe('Map is provided', function () {
        var map = {
                isAuthenticated: false,
                token: null
            },
            Session, $scope;

        beforeEach(module(['vzdSessionProvider', function (SessionProvider) {
            SessionProvider.addKeys(map);
        }]));

        beforeEach(inject(['vzdSession', '$rootScope', function (_Session_, _$rootScope_) {
            Session = _Session_;
            $scope = _$rootScope_;
        }]));

        it('should store a given key if the key is defined in the session map', function (done) {
            Session.set('isAuthenticated', true).then(
                function (s) {
                    expect(s.isAuthenticated).to.be.true;
                    done();
                }
            );
            $scope.$digest();
        });

        it('should NOT store a given key if the key was not defined in the session map', function (done) {
            Session.set('foo', 'bar').then(
                function (s) {
                    expect(s.foo).to.be.undefined;
                    done();
                }
            );
            $scope.$digest();
        });

        it('should be able to retrieve a stored key/value pair with the original type', function (done) {
            Session.set('token', 1237).then(
                function (s) {
                    expect(Session.get('token')).to.equal(1237);
                    done();
                }
            );
            $scope.$digest();
        });

        it('should return all keys', function (done) {
            Session.set('token', 1237).then(
                function (s) {
                    var currentSession = Session.get();
                    expect(currentSession).to.have.keys('token', 'isAuthenticated');
                    expect(currentSession.token).to.equal(1237);
                    done();
                }
            );
            $scope.$digest();
        });

        it('should be able to reset itself to the default values', function (done) {
            Session.set('token', 1237).then(function () {
                Session.destroy().then(function (s) {
                    expect(s).to.eql(map);
                    done();
                });
            });
            $scope.$digest();
        });
    });

    describe('when a store solution is provided', function () {

        var map = {
                isAuthenticated: false
            },
            localStorage = {
                getItem: function (key) {
                    return key;
                },
                setItem: function (key, value) {
                    return {key: key, value: value};
                },
                removeItem: function (key) {
                    return key;
                }
            },
            Session, $scope, spy;

        beforeEach(module(['vzdSessionProvider', function (SessionProvider) {
            SessionProvider.addKeys(map);
            SessionProvider.setStorageProvider([function () {
                return {
                    get: sinon.spy(localStorage, 'getItem'),
                    set: sinon.spy(localStorage, 'setItem'),
                    remove: sinon.spy(localStorage, 'removeItem')
                };
            }]);
        }]));

        beforeEach(inject(['vzdSession', '$rootScope', function (_Session_, _$rootScope_) {
            Session = _Session_;
            $scope = _$rootScope_;
            spy = sinon.spy(localStorage.setItem);
        }]));

        it('should store key value pairs in the provided store', function (done) {

            Session.set('isAuthenticated', true).then(
                function (n) {
                    expect(localStorage.setItem.called).to.be.true;
                    done();
                }
            );
            $scope.$digest();
        });
    });

});
