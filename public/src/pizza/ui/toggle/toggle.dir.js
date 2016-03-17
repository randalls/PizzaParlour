angular
.module(
    'pizza.ui.toggle.toggle.dir',
    []
)
.directive(
    'toggle',
    [
        function () {
            'use strict';
            return {
                scope: {},
                require: 'ngModel',
                controller: [
                    '$scope',
                    function ($scope) {
                        $scope.value = false;
                    }
                ],
                controllerAs: 'ctrl',
                bindToController: true,
                templateUrl: '/pizza/ui/toggle/toggle.html',
                link: function (scope, elm, attr, ngModel) {

                    ngModel.$render = function () {
                        scope.value = ngModel.$viewValue;
                    };

                    scope.toggle = function (val) {
                        ngModel.$setViewValue(!val);
                        ngModel.$render();
                    };
                }
            };
        }
    ]
);
