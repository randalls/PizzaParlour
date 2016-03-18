angular.module('pizza-app.route.create', [
    'ui.router',
    'pizza.create.ctrl',
    'pizza.edit.ctrl'
])
.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider) {
        'use strict';

        $stateProvider
            .state(
                'create',
                {
                    url: '/create',
                    templateUrl: '/pizza/ui/layout/web-layout.html',
                    abstract: true
                }
            ).state(
                'create.pizza',
                {
                    url: '',
                    views: {
                        page: {
                            controller: 'CreateFormController',
                            controllerAs: 'ctrl',
                            templateUrl: '/pizza/home/create.html'
                        }
                    }
                }
            ).state(
                'create.edit',
                {
                    url: '/:pizzaId',
                    views: {
                        page: {
                            controller: 'EditPizzaController',
                            controllerAs: 'ctrl',
                            templateUrl: '/pizza/home/edit.html',
                            resolve: {
                                Toppings: [
                                    'ToppingsService',
                                    function (ToppingsService) {
                                        return ToppingsService.query();
                                    }
                                ]
                            }
                        }
                    }
                }
            );
    }
]);
