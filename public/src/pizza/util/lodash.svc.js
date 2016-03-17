angular
.module(
    'lodash.js',
    []
)
.service(
    'lodash',
    [
        '$window',
        function ($window) {
            'use strict';
            if (!$window._) {
                throw new Error('lodash MUST BE DEFINED ON $window !!!');
            }
            return $window._;
        }
    ]
);
