angular.module('pizza.menu.toppings.ctrl', [

])
.controller('MenuToppingsController', [
    '$log',
    '$scope',
    'Toppings',
    'Pizza',
    function ($log, $scope, Toppings, Pizza) {
        'use strict';
        var ctrl = this;
        ctrl.toppings = Toppings;
        ctrl.pizza = Pizza;
    }
]);
