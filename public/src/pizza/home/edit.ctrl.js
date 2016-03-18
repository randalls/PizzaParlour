angular.module('pizza.edit.ctrl', [
    'lodash.js',
    'pizza-ui.toppings.service',
    'pizza-ui.pizza.service'
])
.controller('EditPizzaController', [
    '$log',
    '$scope',
    '$stateParams',
    'ToppingsService',
    'PizzaService',
    'Toppings',
    function ($log, $scope, $stateParams, ToppingsService, PizzaService, Toppings) {
        'use strict';
        var ctrl = this;
        ctrl.toppings = Toppings;
        ctrl.addedToppings = [];
        ctrl.newTopping = {};

        ctrl.addToPizza = function (topping) {
                var pizzaId = $stateParams.pizzaId;
                PizzaService.addTopping(pizzaId, {topping_id: topping.id}).then(function (response) {
                    ctrl.addedToppings.push(response);
                });
        };

        ctrl.addTopping = function () {
            ToppingsService.create({topping: {name: ctrl.newTopping.name}}).then(function (response) {
                ctrl.toppings.push(response);
                ctrl.newTopping = {};
            });
        };
    }
]);
