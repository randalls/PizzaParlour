angular.module('pizza.create.ctrl', [
    'pizza-ui.pizza.service',
    'pizza-ui.toppings.service'
])
.controller('CreateFormController', [
    '$log',
    '$scope',
    '$uibModal',
    'PizzaService',
    'ToppingsService',
    'CurrentToppings',
    function ($log, $scope, $modal, PizzaService, ToppingsService, CurrentToppings) {
        'use strict';

        var ctrl = this;
        ctrl.toppings = CurrentToppings;
    }
]);
