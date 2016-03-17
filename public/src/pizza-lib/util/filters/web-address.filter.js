angular
.module(
    'pizza-lib.util.filters.web-address',
    []
)
.filter(
    'web',
    function() {
        'use strict';

        return function(input) {
            if (input.indexOf('http') < 0) {
                return 'http://' + input;
            }
            return input;
        };
    }
);
