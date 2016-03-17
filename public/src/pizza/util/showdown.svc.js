angular
.module(
    'showdown.js',
    []
)
.service(
    'showdown',
    [
        '$window',
        function ($window) {
            'use strict';
            if (!$window.showdown) {
                throw new Error('Showdown MUST BE DEFINED ON $window !!!');
            }
            return $window.showdown;
        }
    ]
);
