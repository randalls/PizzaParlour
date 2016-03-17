angular
.module(
    'pizza-lib.storage.store.factory',
    []
)
.provider(
    'pizzaStore',
    [
        function () {
            'use strict';

            this.$get = [
                function () {
                    return function Store(api) {
                        if (!api.hasOwnProperty('get')) { throw new Error('api provided requires "get" method'); }
                        if (!api.hasOwnProperty('set')) { throw new Error('api provided requires "set" method'); }
                        if (!api.hasOwnProperty('remove')) { throw new Error('api provided requires "remove" method'); }
                        this.get = api.get;
                        this.set = api.set;
                        this.remove = api.remove;
                    };
                }
            ];
        }
    ]
);
