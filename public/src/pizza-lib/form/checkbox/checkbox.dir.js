angular
.module(
    'pizza-lib.form.checkbox.checkbox-input.dir',
    [

    ]
)
.directive(
    'checkbox',
    [
        '$log',
        function ($log) {
            'use strict';
            return {
                scope: {
                    name: '@',
                    value: '=',
                    checked: '=ngModel',
                    disabled: '=?ngDisabled'
                },
                transclude: true,
                require: ['ngModel', 'checkbox', '?^^ngForm'],
                templateUrl: '/pizza-lib/form/checkbox/checkbox.html',
                controller: [
                    function () {
                        //var ctrl = this;
                    }
                ],
                controllerAs: 'ctrl',
                bindToController: true,
                link: function (scope, elm, attr, controllers) {
                    var ngModel = controllers[0],
                        checkbox = controllers[1],
                        form = controllers[2];

                    ngModel.$render = function () {
                        checkbox.checked = ngModel.$viewValue;
                    };

                    scope.toggle = function () {
                        ngModel.$setViewValue(!checkbox.checked);
                    };

                    if (form) {
                        $log.debug(form);
                    }
                }
            };
        }
    ]
);
