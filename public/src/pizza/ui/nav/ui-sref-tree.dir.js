angular
.module(
    'pizza.ui.nav.ui-sref-active-tree.dir',
    [
        'ui.router'
    ]
)
.directive(
    'uiSrefActiveTree',
    [
        function () {
            'use strict';
            return {
                controller: [
                    '$log',
                    '$scope',
                    '$element',
                    '$attrs',
                    '$state',
                    function ($log, $scope, $element, $attrs, $state) {
                        var config;

                        function update (cssClass, state) {
                            $element[$state.includes(state) ? 'addClass' : 'removeClass'](cssClass);
                        }

                        $attrs.$observe('uiSrefActiveTree', function (val) {
                            config = $scope.$eval(val);
                            update(config.class, config.state);
                        });

                        $scope.$on('$stateChangeSuccess', function () {
                            update(config.class, config.state);
                        });
                    }
                ]
            };
        }
    ]
);
