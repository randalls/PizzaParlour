angular
.module(
    'moment.js',
    []
)
.service(
    'moment',
    [
        '$window',
        function ($window) {
            'use strict';

            if (!$window.moment) {
                throw new Error('MOMENT MUST BE DEFINED ON $window !!!');
            }
            return $window.moment;
        }
    ]
);
