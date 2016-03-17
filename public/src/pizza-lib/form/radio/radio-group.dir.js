angular
.module(
    'pizza-lib.form.radio.radio-group.dir',
    [
        'pizza-lib.form.radio.radio-input.dir'
    ]
)
.directive(
    'radioGroup',
    [
        '$log',
        function () {
            'use strict';
            return {
                scope: {

                },
                templateUrl: '/pizza-lib/form/radio/radio-group.html',
                require: ['ngModel', 'radioGroup'],
                transclude: true,
                controller: [
                    function () {

                    }
                ],
                controllerAs: 'ctrl',
                bindToController: true,
                link: function (scope, elm, attr, controllers) {
                    var ngModel = controllers[0],
                        group = controllers[1];

                    ngModel.$render = function () {
                        group.selected = ngModel.$viewValue;
                    };

                    group.select = function (n) {
                        ngModel.$setViewValue(n);
                        ngModel.$render();
                    };
                }
            };
        }
    ]
);
