'use strict';

describe('Store Entity', function() {

    beforeEach(module('vizzda-lib.storage.store.factory'));

    it('should error if a store is not provided the correct api', inject(['vzdStore', function (Store) {
        var tryStore = function () {
                return new Store({});
            };

        expect(tryStore).to.throw(Error);
    }]));

    it('should return a store entity when a proper api is provided', inject(['vzdStore', function (Store) {
        var api = {
                get: function () {},
                set: function () {},
                remove: function () {}
            },
            tryStore = function () {
                return new Store(api);
            };

        expect(tryStore).to.not.throw(Error);
        expect(tryStore()).to.have.keys('get', 'set', 'remove');
    }]));
});
