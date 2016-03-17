angular
.module(
    'pizza.ui.contact.phone.dir',
    [
        'pizza-app.value.phone-number'
    ]
)
.directive(
    'phone',
    [
        function () {
            'use strict';

            return {
                scope: {
                    type: '@'
                },
                restrict: 'E',
                templateUrl: '/pizza/ui/contact/phone.html',
                controller: [
                    'pizza_PHONE_NUMBER',
                    function (pizza_PHONE_NUMBER) {
                        var ctrl = this;
                        ctrl.number = pizza_PHONE_NUMBER[ctrl.type || 'support'];
                    }
                ],
                controllerAs: 'ctrl',
                bindToController: true
            };
        }
    ]
);
