angular
.module(
    'pizza.util.format.filter',
    [
        'moment.js',
        'lodash.js'
    ]
)
.filter(
    'format',
    [
        '$log',
        '$filter',
        'moment',
        'lodash',
        'DEFAULT_DATE_FORMAT',
        function ($log, $filter) {
            'use strict';
            return function (input) {

                if (angular.isNumber(input)) {
                    return $filter('number')(input);
                }

                return input;
            };
        }
    ]
);
