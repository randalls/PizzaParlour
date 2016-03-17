angular
.module(
    'pizza.ui.state.dir',
    [
        'ui.router'
    ]
)
.directive(
    'state',
    [
        '$log',
        '$state',
        'lodash',
        function ($log, $state, _) {
            'use strict';

            return {
                link: function (scope, elm) {
                    var classes, s;

                    scope.$on('$stateChangeSuccess', function () {
                        s = $state.current.name;

                        if (!s) { return; }

                        elm.removeClass(classes);

                        classes = [
                            'state-' + s.split('.')[0],
                            'state-' + _.kebabCase(s)
                        ].join(' ');

                        elm.addClass(classes);
                    });
                }
            };
        }
    ]
);
