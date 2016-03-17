angular
.module(
    'pizza.ui.dropdown.dropdown-content.dir',
    [
        'ui.bootstrap'
    ]
)
.directive(
    'dropdownContent',
    [
        function () {
            'use strict';
            return {
                scope: {
                    text: '@',
                    size: '@?',
                    direction: '@?',
                    up: '=?',
                    caret: '=?',
                    type: '@?',
                    icon: '@?'
                },
                transclude: true,
                templateUrl: '/pizza/ui/dropdown/dropdown-content.html',
                controller: [
                    '$log',
                    '$scope',
                    function ($log, $scope) {
                        var ctrl = this;

                        ctrl.toggled = function (open) {
                            ctrl.open = open;
                            $scope.$broadcast('dropdown:toggle', open);
                        };

                        $scope.$on('dropdown:close', function (ev) {
                            if (ev && ev.stopPropagation) { ev.stopPropagation(); }
                            $scope.open = false;
                        });

                        ctrl.hideCaret = (angular.isDefined(ctrl.caret) && ctrl.caret === false);

                        ctrl.open = true;
                    }
                ],
                controllerAs: 'ctrl',
                bindToController: true,
                link: function (scope) {
                    scope.$watch('ctrl.type', function (n) {
                        scope.type = n || 'dropdown';
                    });
                }
            };
        }
    ]
);
