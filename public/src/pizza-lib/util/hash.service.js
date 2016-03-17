angular
.module(
    'pizza-lib.util.hash.service',
    [

    ]
)
.service(
    'Hash',
    [
        function () {
            'use strict';
            var service = {},
                uid = 0;

            service.nextUid = function () {
                return ++uid;
            };

            service.getKey = function (obj, nextUidFn) {
                var key = obj && obj.$$hashKey;

                if (key) {
                    if (typeof key === 'function') {
                      key = obj.$$hashKey();
                    }
                    return key;
                }

                var objType = typeof obj;
                if (objType === 'function' || (objType === 'object' && obj !== null)) {
                    key = obj.$$hashKey = objType + ':' + (nextUidFn || service.nextUid)();
                } else {
                    key = objType + ':' + obj;
                }

                return key;
            };

            return service;
        }
    ]
);
