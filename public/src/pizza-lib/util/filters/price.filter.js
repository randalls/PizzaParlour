// fileSize.js
angular
.module(
    'pizza-lib.util.filters.price',
    []
)
.filter(
    'price',
    [
        '$filter',
        function($filter) {
            'use strict';

            var currency = $filter('currency'),
                num = $filter('number'),
                billion = 1000000000,
                million = 1000000,
                thousand = 100000;

            function getCurrency (val, decimals) {
                return currency(num(val, decimals || 1));
            }

            return function(input) {
                if (!input) {
                    return 'N/A';
                }

                if (!angular.isNumber(input)) {
                    return 'NaN';
                }

                if (input >= billion) {
                    return getCurrency(input / billion, 1) + ' B';
                }

                if (input >= million) {
                    return getCurrency(input / million, 1) + ' M';
                }

                if (input >= thousand) {
                    return getCurrency(input / thousand, 1) + ' K';
                }

                return getCurrency(input, 2);
            };
        }
    ]
);
