angular
.module(
    'pizza.ui.dropdown.dropdown-select.dir',
    [
        'pizza-lib.parse.option-parser.service',
        'lodash.js'
    ]
)
.directive(
    'dropdownSelect',
    [
        '$log',
        'vzdOptionParser',
        'lodash',
        function ($log, parser, _) {
            'use strict';

            return {
                scope: true,
                templateUrl: '/pizza/ui/dropdown/dropdown-select.html',
                restrict: 'AE',
                require: 'ngModel',
                controller: [
                    function () {
                        var ctrl = this;
                        ctrl.toggled = function (open) {
                            ctrl.isOpen = open;
                        };
                        ctrl.lodash = _;
                    }
                ],
                controllerAs: 'ddCtrl',
                link: function (scope, element, attrs, ngModel) {
                    var parsed = parser.parse(attrs.dropdownSelect);
                    scope.$watchCollection(parsed.sourceName, function () {
                        var items = parsed.source(scope),
                            options = [],
                            locals = {};

                        angular.forEach(items, function (value, key) {
                            locals[parsed.itemName] = value;
                            options.push({
                                id: parser.optionId(scope, key, 'dropdown'),
                                label: parsed.viewMapper(scope, locals),
                                model: parsed.modelMapper(scope, locals)
                            });
                        });

                        scope.options = options;
                    });

                    if (!attrs.text) {
                        scope.$watch('value', function () {
                            if (scope.options) {
                                var opt;
                                angular.forEach(scope.options, function (o) {
                                    if (o.model === scope.value) {
                                        opt = o;
                                    }
                                });
                                scope.text = (opt) ? opt.label : 'Undefined';
                            }
                        });
                    } else {
                        attrs.$observe('text', function () {
                            scope.text = attrs.text;
                        });
                    }

                    attrs.$observe('direction', function () {
                        scope.direction = attrs.direction;
                    });

                    ngModel.$render = function() {

                        var option = _.find(scope.options, function (n) {
                            var str = angular.toJson(ngModel.$viewValue) === angular.toJson(n.model);
                            $log.debug(ngModel.$viewValue, n.model);
                            return str;
                        });

                        scope.value = (option) ? option.model : null;
                    };

                    scope.select = function (option) {
                        ngModel.$setViewValue(option.model);
                        ngModel.$render();
                    };
                }
            };
        }
    ]
);
