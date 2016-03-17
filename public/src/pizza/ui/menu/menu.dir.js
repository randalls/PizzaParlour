angular
.module(
    'pizza-lib.ui.menu.dir',
    [
        'pizza-lib.parse.options.service'
    ]
)
.directive(
    'vzdMenu',
    [
        '$log',
        'Options',
        function ($log, Options) {
            'use strict';

            return {
                scope: true,
                templateUrl: '/pizza-lib/ui/menu/menu.html',
                restrict: 'AE',
                require: 'ngModel',
                controller: [
                    function () {
                        var ctrl = this;
                        ctrl.toggled = function (open) {
                            ctrl.isOpen = open;
                        };
                    }
                ],
                controllerAs: 'ddCtrl',
                link: function (scope, element, attrs, ngModel) {
                    var parsed = Options.parse(attrs.options, scope.$parent);

                    scope.options = {
                        items: []
                    };

                    function updateOptions () {
                        scope.options = parsed.getOptions();
                        ngModel.$render();
                        $log.debug(scope.options);
                    }

                    scope.$watchCollection(parsed.getWatchables, updateOptions);

                    if (parsed.trackBy) {
                        scope.$watchCollection(
                            function() {
                                if (angular.isArray(ngModel.$viewValue)) {
                                    return ngModel.$viewValue.map(function(value) {
                                        return parsed.getTrackByValue(value);
                                    });
                                }
                            },
                            function() {
                                ngModel.$render();
                            }
                        );
                    }

                    attrs.$observe('placeholder', function () {
                        scope.placeholder = attrs.placeholder;
                    });

                    attrs.$observe('label', function () {
                        scope.label = attrs.label;
                    });

                    ngModel.$render = function() {
                        var selected;
                        angular.forEach(scope.options.items, function (val) {
                            if (val.viewValue === ngModel.$viewValue) {
                                selected = val;
                            }
                        });
                        scope.selected = selected;
                        scope.displayValue = (scope.label) ? scope.label : (selected) ? selected.label : scope.placeholder;
                    };

                    scope.select = function (option) {
                        ngModel.$setViewValue(option.viewValue);
                        ngModel.$render();
                    };
                }
            };
        }
    ]
);
