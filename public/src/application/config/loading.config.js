angular
.module(
    'pizza-app.config.loading',
    [
        'pizza.ui.loading.page-loader.dir'
    ]
)
.run(
    [
        '$log',
        '$q',
        '$rootScope',
        function ($log, $q, $rootScope) {
            'use strict';

            $rootScope.$on('$stateChangeError', function () {
                $rootScope.loading = false;
            });

            $rootScope.$on('$stateChangeStart', function () {
                $rootScope.loading = true;
            });

            $rootScope.$on('$stateChangeSuccess', function () {
                $rootScope.loading = false;
            });

            $rootScope.$on('$stateNotFound', function () {
                $rootScope.loading = false;
            });
        }
    ]
);
