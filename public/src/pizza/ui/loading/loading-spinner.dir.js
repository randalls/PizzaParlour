angular
.module(
    'pizza.ui.loading.loading-spinner.dir',
    []
)
.directive(
    'loadingSpinner',
    [
        function () {
            'use strict';
            return {
                scope: {
                    show: '=on',
                    background: '='
                },
                controller: [
                    '$log',
                    function () {}
                ],
                controllerAs: 'ctrl',
                bindToController: true,
                templateUrl: '/pizza/ui/loading/loading-spinner.html'
            };
        }
    ]
);
