angular
.module(
    'pizza-app.route.layout',
    [
        'ui.router'
    ]
)
.config(
    [
        '$stateProvider',
        function ($stateProvider) {
            'use strict';

            $stateProvider
                .state(
                    'layout',
                    {
                        abstract: true,
                        templateUrl: '/pizza/ui/layout/web-layout.html'
                    }
                );
        }
    ]
);
