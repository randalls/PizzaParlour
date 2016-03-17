angular.module('pizza-ui.pizza.service', [
    'lodash.js'
])
.provider('PizzaService', [
    function () {
        'use strict';

        this.$get = [
            '$log',
            'lodash',
            'pizzaApi',
            function ($log, _, api) {
                var service = {};

                service.query = function () {
                    return api.get('/pizzas').then(function (response) {
                        return response.data;
                    });
                };

                service.create = function (pizza) {
                    return api.post('/pizzas', pizza).then(function (response) {
                        return response.data;
                    });
                };

                service.getToppings = function (pizzaId) {
                    return api.get('/pizzas/' + pizzaId + '/toppings').then(function (response) {
                        return response.data;
                    });
                };

                service.addTopping = function (pizzaId, topping) {
                    return api.post('/pizzas/' + pizzaId + '/toppings', topping).then(function (response) {
                        return response.data;
                    });
                };

                return service;
            }
        ]
    }
]);
