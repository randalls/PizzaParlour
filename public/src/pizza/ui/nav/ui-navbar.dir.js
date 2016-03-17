angular
.module(
    'pizza.ui.navbar',
    [
        'lodash.js',
        'pizza.ui.nav.ui-sref-active-tree.dir',
        'pizza.authorization.is-role.dir',
        'pizza.authorization.is-not-role.dir',
        'pizza.authorization.is-authorized.dir'
    ]
)
.directive(
    'navbar',
    [
        function () {
            'use strict';
            return {
                scope: {},
                templateUrl: '/pizza/ui/nav/ui-navbar.html',
                controller: [
                    '$log',
                    '$scope',
                    '$rootScope',
                    '$state',
                    'vzdSession',
                    function ($log, $scope, $rootScope, $state, Session) {
                        var ctrl = this;
                        ctrl.session = Session;

                        ctrl.logout = function () {
                            $rootScope.$broadcast('auth:logout');
                        };

                        $scope.$on('$stateChangeSuccess', function (ev, toState) {
                            ctrl.title = (toState.data) ? toState.data.name : '';
                        });
                    }
                ],
                controllerAs: 'navbar'
            };
        }
    ]
);
