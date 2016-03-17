angular.module('pizza-app.route.menu', [
    'ui.router',
    'pizza.menu.ctrl',
    'pizza.menu.toppings.ctrl'
])
.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider) {
        'use strict';

        $stateProvider
            .state(
                'menu',
                {
                    url: '/menu',
                    templateUrl: '/pizza/ui/layout/web-layout.html',
                    abstract: true
                }
            ).state(
                'menu.list',
                {
                    url: '?',
                    views: {
                        page: {
                            controller: 'MenuController',
                            controllerAs: 'ctrl',
                            templateUrl: '/pizza/home/menu.html',
                            resolve: {
                                Menu: ['PizzaService', function (PizzaService) {
                                    return PizzaService.query();
                                }]
                            }
                        }
                    }
                }
            );
    }
]);
