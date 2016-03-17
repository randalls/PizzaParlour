angular.module('pizza-ui.toppings.service', [
    'lodash.js'
])
.provider(
    'ToppingsService', [
        function () {
            'use strict';

            this.$get = [
                '$log',
                'lodash',
                'pizzaApi',
                function ($log, _, api) {
                    var service = {};

                    service.query = function () {
                        return api.get('/toppings').then(function (response) {
                            return response.data;
                        });
                    };

                    service.create = function (topping) {
                        return api.post('/toppings', topping).then(function (response) {
                            return response.data;
                        });
                    };

                    return service;
                }
            ]
        }
    ]
);
