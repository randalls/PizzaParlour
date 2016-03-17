angular
.module(
    'pizza-app.config.location',
    []
)
.config(
    [
        '$locationProvider',
        function ($locationProvider) {
            'use strict';

            $locationProvider.html5Mode(true);
        }
    ]
);
