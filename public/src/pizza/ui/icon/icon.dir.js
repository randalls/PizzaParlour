angular
.module(
    'pizza.ui.icon.icon-element.dir',
    []
)
.directive(
    'iconElement',
    [
        function () {
            'use strict';
            return {
                scope: {
                    icon: '@'
                },
                restrict: 'EA',
                link: function () {},
                templateUrl: '/src/pizza/ui/icon/icon.html'
            };
        }
    ]
);
