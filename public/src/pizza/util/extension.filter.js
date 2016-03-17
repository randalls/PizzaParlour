angular
.module(
    'pizza.util.extension.filter',
    [

    ]
)
.filter(
    'extension',
    [
        function () {
            'use strict';
            var regexp = new RegExp(/(?:\.([^.]+))?$/);
            return function (input) {
                return regexp.exec(input)[1];
            };
        }
    ]
);
