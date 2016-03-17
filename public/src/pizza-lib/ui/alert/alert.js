angular
.module(
    'pizza-lib.ui.alert.alert.dir',
    [
        'pizza-lib.ui.alert.alert-container.dir',
        'pizza-lib.ui.alert.alert-service'
    ]
)
.directive(
    'pizzaAlert',
    [
        '$timeout',
        function($timeout) {
            'use strict';

            return {
                require: '^pizzaAlertContainer',
                restrict: 'EA',
                scope: {
                    pizzaAlertOptions: '='
                },
                templateUrl: '/pizza-lib/ui/alert/alert.html',
                link: function (scope, el, attrs, containerCtrl) {
                    scope.alert = scope.pizzaAlertOptions;

                    if (scope.alert.closeOnClick) {
                        el.on('click', function () {
                            containerCtrl.remove(scope.alert.id);
                            scope.$apply();
                        });
                    }

                    if (scope.alert.timeout > 0) {
                        scope.autoCloseTimeout = $timeout(function () {
                            containerCtrl.remove(scope.alert.id);
                        }, scope.alert.timeout);
                    }

                    scope.$on('$destroy', function () {
                        if (scope.autoCloseTimeout) {
                            $timeout.cancel(scope.autoCloseTimeout);
                        }
                    });
                }
            };
        }
    ]
);
