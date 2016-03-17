angular
.module(
    'pizza-lib.util.test.service',
    [

    ]
)
.service(
    'Test',
    [
        function () {
            'use strict';
            var service = {};

            var NODE_TYPE_ELEMENT = 1;
                //NODE_TYPE_ATTRIBUTE = 2,
                //NODE_TYPE_TEXT = 3,
                //NODE_TYPE_COMMENT = 8,
                //NODE_TYPE_DOCUMENT = 9,
                //NODE_TYPE_DOCUMENT_FRAGMENT = 11;

            service.isWindow = function (obj) {
                return obj && obj.window === obj;
            };

            service.isArrayLike = function (obj) {
                if (obj === null || service.isWindow(obj)) {
                    return false;
                }

                // Support: iOS 8.2 (not reproducible in simulator)
                // "length" in obj used to prevent JIT error (gh-11508)
                var length = 'length' in Object(obj) && obj.length;

                if (obj.nodeType === NODE_TYPE_ELEMENT && length) {
                    return true;
                }

                return angular.isString(obj) || angular.isArray(obj) || length === 0 || typeof length === 'number' && length > 0 && (length - 1) in obj;
            };

            return service;
        }
    ]
);
