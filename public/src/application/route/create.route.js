angular.module('pizza-app.route.create', [
    'ui.router',
    'pizza.create.ctrl'
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
                            contoller: 'CreateFormController',
                            controllerAs: 'ctrl',
                            templateUrl: '/pizza/home/create.html',
                            resolve: {
                                CurrentToppings: ['ToppingsService', function (ToppingsService) { return ToppingsService.query();}]
                            }
                        }
                    }
                }
            );
    }
]);
