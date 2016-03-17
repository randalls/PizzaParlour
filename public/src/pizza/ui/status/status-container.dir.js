angular
.module(
    'pizza.ui.status.status-container.dir',
    [

    ]
)
.directive(
    'statusContainer',
    [
        function () {
            'use strict';

            /*
            Types: 'timeline', 'mini', 'list'
            */

            return {
                scope: {
                    type: '@?'
                },
                templateUrl: '/pizza/ui/status/status-container.html',
                controller: [
                    function () {}
                ],
                controllerAs: 'ctrl',
                bindToController: true,
                transclude: true,
                link: function () {

                }
            };
        }
    ]
);
