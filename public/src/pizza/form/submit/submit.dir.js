angular
.module(
    'pizza.form.submit.submit-button.dir',
    [

    ]
)
.directive(
    'submit',
    [
        '$log',
        function () {
            'use strict';

            return {
                scope: {
                    processing: '=submit'
                },
                require: ['submit', '^^form'],
                controller: [
                    function () {

                    }
                ],
                controllerAs: 'ctrl',
                bindToController: true,
                transclude: true,
                templateUrl: '/pizza/form/submit/submit.html'
            };
        }
    ]
);
