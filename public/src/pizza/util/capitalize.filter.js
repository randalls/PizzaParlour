angular
.module(
    'pizza.util.capitalize.filter',
    [
        'lodash.js'
    ]
)
.filter(
    'capitalize',
    [
        'lodash',
        'lowercaseFilter',
        function (_, lowercaseFilter) {
            'use strict';
            return function (input, all) {
                input = lowercaseFilter(input);
                if (all) {
                    return _.startCase(input);
                }
                return _.capitalize(input);
            };
        }
    ]
);
