angular
.module(
    'pizza.util.list.filter',
    [
        'lodash.js'
    ]
)
.filter(
    'list',
    [
        'lodash',
        function (_) {
            'use strict';
            return function(input, prop) {
                var list = input;
                if (prop) {
                    list = _.pluck(input, prop);
                }
                return list.join(',');
            };
        }
    ]
);
