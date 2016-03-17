angular.module('pizza-app.route.home', [
    'ui.router',
    'pizza.home.ctrl'
])
.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider) {
        'use strict';

        $stateProvider
            .state(
                'pizza',
                {
                    url: '',
                    templateUrl: '/pizza/ui/layout/web-layout.html',
                    abstract: true
                }
            ).state(
                'pizza.home',
                {
                    url: '/',
                    views: {
                        page: {
                            controller: 'HomeController',
                            controllerAs: 'ctrl',
                            templateUrl: '/pizza/home/home.html'
                        }
                    }
                }
            );
    }
]);
