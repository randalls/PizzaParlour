angular.module('pizza.menu.ctrl', [
    'pizza-ui.pizza.service',
    'pizza.menu.toppings.ctrl',
    'lodash.js'
])
.controller('MenuController', [
    '$log',
    '$scope',
    '$state',
    'lodash',
    '$uibModal',
    'PizzaService',
    'Menu',
    function ($log, $scope, $state, _, $modal, PizzaService, Menu) {
            'use strict';
            var ctrl = this;
            ctrl.Menu = Menu;

            ctrl.getToppings = function (pizza) {
                return $modal.open({
                    templateUrl: '/pizza/home/menu.modal.html',
                    controller: 'MenuToppingsController',
                    controllerAs: 'ctrl',
                    bindToController: true,
                    size: 'sm',
                    resolve: {
                        Pizza: function () {
                            return angular.copy(pizza);
                        },
                        Toppings: function () {
                            return PizzaService.getToppings(pizza.id);
                        }
                    }
                });
            };

            ctrl.addToppings = function(pizza) {
                $state.go('create.edit', {
                    pizzaId: pizza.id
                });
            };
    }
]);
