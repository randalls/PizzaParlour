angular
.module(
    'pizza.ui.status.status-item.dir',
    [
        'pizza.ui.status.filter'
    ]
)
.directive(
    'statusItem',
    [
        function () {
            'use strict';

            /*
            Types: 'timeline', 'mini', 'list'
            */

            return {
                scope: {
                    status: '=?',
                    label: '@?'
                },
                require: ['statusItem', '^statusContainer'],
                templateUrl: '/pizza/ui/status/status-item.html',
                controller: [
                    function () {}
                ],
                controllerAs: 'ctrl',
                bindToController: true,
                transclude: true,
                link: function (scope, elm, attr, controllers) {
                    var item = controllers[0],
                        container = controllers[1];

                    item.type = container.type;
                }
            };
        }
    ]
);
