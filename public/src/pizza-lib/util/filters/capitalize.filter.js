angular
.module('pizza-lib.util.filters.capitalize', [])
.filter('pizzaCapitalize',
    [
        function() {
            'use strict';
            return function(input) {
                return angular.uppercase(input.charAt(0)) + angular.lowercase(input.substr(1));
            };
        }
    ]
);
