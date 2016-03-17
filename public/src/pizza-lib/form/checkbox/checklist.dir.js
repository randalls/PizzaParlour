angular
.module(
    'pizza-lib.form.checkbox.checklist.dir',
    [
        'pizza-lib.form.checkbox.checkbox-input.dir'
    ]
)
.directive(
    'checklist',
    [
        '$log',
        function () {
            'use strict';
            return {
                scope: {
                    selected: '=ngModel'
                },
                templateUrl: '/pizza-lib/form/checkbox/checklist.html',
                controller: [
                    function () {
                        var ctrl = this;

                        if (!ctrl.selected) {
                            ctrl.selected = [];
                        } else {
                            if (!angular.isArray(ctrl.selected)) {
                                ctrl.selected = [ctrl.selected];
                            }
                        }

                        ctrl.remove = function (value) {
                            var index = ctrl.selected.indexOf(value);
                            ctrl.selected.splice(index, 1);
                        };

                        ctrl.add = function (value) {
                            ctrl.selected.push(value);
                        };

                        ctrl.isChecked = function (value) {
                            return ctrl.selected.indexOf(value) > -1;
                        };
                    }
                ],
                controllerAs: 'ctrl',
                bindToController: true,
                require: ['ngModel', 'checklist'],
                transclude: true,
                link: function (scope, elm, attr, controllers) {
                    var ngModel = controllers[0];

                    ngModel.$render = function () {
                        //$log.debug(ngModel.$viewValue);
                    };

                    if (attr.required) {
                        ngModel.$validators.required = function (modelValue) {
                            return modelValue.length > 0;
                        };
                    }

                    scope.$watchCollection('ctrl.selected', function (n, o) {
                        if (n === o || !n) { return; }


                        ngModel.$setViewValue(angular.copy(n));
                        ngModel.$render();
                    });
                }
            };
        }
    ]
);
