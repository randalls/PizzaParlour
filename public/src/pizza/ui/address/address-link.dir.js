angular
.module(
    'pizza.ui.address.address-link.dir',
    []
)
.directive(
    'addressLink',
    [
        function () {
            'use strict';
            return {
                scope: {
                    street1: '=',
                    street2: '=',
                    city: '=',
                    state: '=',
                    zip: '='
                },
                templateUrl: '/pizza/ui/address/address-link.html',
                controller: [
                    '$log',
                    function () {}
                ],
                controllerAs: 'ctrl',
                bindToController: true
            };
        }
    ]
);
