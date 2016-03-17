angular
.module(
    'pizza.form.select.custom-select.dir',
    [
        'lodash.js',
        'pizza-lib.parse.option-parser.service',
        'pizza-lib.util.debounce.service'
    ]
)
.directive(
    'customSelect',
    [
        '$log',
        'vzdOptionParser',
        'debounce',
        'lodash',
        function ($log, parser, debounce, _) {
            'use strict';

            function testRequired (modelValue, viewValue) {
                if (!viewValue) {
                    return false;
                }
                if (viewValue && angular.isArray(viewValue) && !viewValue.length) {
                    return false;
                }
                return true;
            }

            return {
                scope: {
                    placeholder: '@?',
                    size: '@?',
                    required: '=?ngRequired',
                    disabled: '=?ngDisabled',
                    multi: '=?',
                    selected: '=ngModel'
                },
                require: 'ngModel',
                templateUrl: '/pizza/form/select/custom-select.html',
                controller: [
                    '$scope',
                    '$attrs',
                    function ($scope) {
                        var ctrl = this;

                        ctrl.open = false;

                        $scope.$watch('ctrl.multi', function (n) {
                            $scope.multi = n;
                        });
                    }
                ],
                controllerAs: 'ctrl',
                bindToController: true,
                link: function (scope, element, attrs, ngModel) {
                    var parsed = parser.parse(attrs.repeat);

                    scope.$watch('ctrl.required', function (n) {
                        if (n) {
                            ngModel.$validators.required = testRequired;
                        } else {
                            try {
                                delete ngModel.$validators.required;
                            } catch (err) {}
                        }
                    });

                    scope.$watch('ctrl.touched', function (n) {
                        if (n) {
                            ngModel.$setTouched();
                        }
                    });

                    scope.$watchCollection(
                        '$parent.' + parsed.sourceName,
                        function (items) {
                            var options = [],
                                locals = {};

                            angular.forEach(items, function (value, key) {
                                locals[parsed.itemName] = value;
                                options.push({
                                    id: parser.optionId(scope, key, 'option'),
                                    label: parsed.viewMapper(scope, locals),
                                    model: parsed.modelMapper(scope, locals)
                                });
                            });

                            scope.options = options;
                            ngModel.$render();
                        }
                    );

                    ngModel.$render = function() {
                        if (angular.isArray(ngModel.$viewValue)) {
                            var models = _.map(ngModel.$viewValue, function (n) {
                                return _.find(scope.options, function (option) {
                                    return n === option.model;
                                });
                            });

                            if (models && models.length && angular.isDefined(models[0])) {
                                scope.value = (models.length > 1) ? 'Multiple Selected' : models[0].label;
                            } else {
                                scope.value = null;
                            }
                        } else {
                            var model = _.findWhere(scope.options, {model: ngModel.$viewValue});
                            scope.value = (model) ? model.label : ngModel.$viewValue;
                        }
                    };

                    scope.$watch('ctrl.selected', function () {
                        ngModel.$render();
                    }, true);

                    scope.select = function (option) {
                        var val = ngModel.$viewValue,
                            set = ngModel.$setViewValue;

                        if (scope.multi) {
                            if (val && angular.isArray(val)) {
                                if (_.contains(val, option.model)) {
                                    _.pull(val, option.model);
                                } else {
                                    val.push(option.model);
                                }
                            } else {
                                set([option.model]);
                            }
                        } else {
                            set(option.model);
                        }
                    };
                }
            };
        }
    ]
);
