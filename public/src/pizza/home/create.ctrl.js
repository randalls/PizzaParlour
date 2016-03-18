angular.module('pizza.create.ctrl', [
    'ui.router',
    'pizza-ui.pizza.service',
    'pizza-ui.toppings.service'
])
.controller('CreateFormController', [
    '$log',
    '$scope',
    '$state',
    '$uibModal',
    'PizzaService',
    'ToppingsService',
    function ($log, $scope, $state, $modal, PizzaService, ToppingsService) {
        'use strict';

        var ctrl = this;
        ctrl.newPizza = {};

        ctrl.createPizza = function (pizza, form) {
                PizzaService.create(pizza).then(function (response) {
                    $state.go('create.edit', {
                        pizzaId: response.id
                    });
                });
        };
    }
]);
