angular
.module(
    'pizza.form.upload.upload-file.dir',
    []
)
.directive(
    'uploadFile',
    [
        function () {
            'use strict';
            return {
                scope: {
                    label: '@?',
                    icon: '@?',
                    file: '='
                },
                controller: [
                    '$log',
                    '$scope',
                    '$element',
                    function ($log, $scope, $element) {
                        var ctrl = this;

                        ctrl.find = function () {
                            var input = $element.find('input')[0];
                            if (input) {
                                input.click();
                            }
                        };

                        $scope.$watchCollection('ctrl', function (n) {
                            $log.debug(n);
                        });
                    }
                ],
                controllerAs: 'ctrl',
                bindToController: true,
                templateUrl: '/pizza/form/upload/upload-file.html'
            };
        }
    ]
);
