angular
.module(
    'pizza.ui.footer',
    [
        'pizza.ui.nav.ui-sref-active-tree.dir'
    ]
)
.directive(
    'footer',
    [
        function () {
            'use strict';
            return {
                scope: {},
                restrict: 'A',
                templateUrl: '/pizza/ui/nav/ui-footer.html',
                controller: [
                    '$log',
                    '$scope',
                    '$state',
                    'vzdSession',
                    'vzdOAuth',
                    function ($log, $scope, $state, Session) {
                        var ctrl = this;
                        ctrl.session = Session;
                    }
                ],
                controllerAs: 'ctrl'
            };
        }
    ]
);
