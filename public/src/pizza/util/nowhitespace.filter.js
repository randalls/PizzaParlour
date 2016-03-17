angular
.module(
    'pizza.util.nowhitespace.filter',
    [
        'lodash.js'
    ]
)
.filter(
    'nowhitespace',
    [
        'lodash',
        function(_) {
            'use strict';
            var f = 'camelCase';
            return function(input, formatter) {
                formatter = formatter || f;
                return _[formatter](input);
            };
        }
    ]
);
