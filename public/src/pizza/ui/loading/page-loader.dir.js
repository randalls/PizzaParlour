angular
.module(
    'pizza.ui.loading.page-loader.dir',
    [

    ]
)
.directive(
    'pageLoader',
    [
        function () {
            'use strict';
            return {
                scope: {
                    show: '=on'
                },
                controller: [
                    '$log',
                    function () {}
                ],
                controllerAs: 'ctrl',
                bindToController: true,
                templateUrl: '/pizza/ui/loading/page-loader.html'
            };
        }
    ]
);
