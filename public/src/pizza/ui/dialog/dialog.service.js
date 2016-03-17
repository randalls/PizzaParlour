angular
.module(
    'pizza.dialog.simple-dialog.service',
    [
        'pizza.ui.dialog.basic-dialog.ctrl',
        'ui.bootstrap',
        'lodash.js'
    ]
)
.provider(
    'Dialog',
    [
        function () {
            'use strict';
            this.$get = [
                '$log',
                '$uibModal',
                '$rootScope',
                'lodash',
                function ($log, $modal, $rootScope, _) {
                    var service = {},
                        defaults = {
                            templateUrl: '/pizza/ui/dialog/dialog.basic.html',
                            controller: 'DialogCtrl',
                            controllerAs: 'ctrl'
                        },
                        options = {
                            cancellable: true
                        };

                    service.open = function (config, modalOverride) {
                        var scope = $rootScope.$new(),
                            dialog, opts;

                        opts = _.defaults(scope, config, options);
                        dialog = _.defaults({scope: opts}, modalOverride, defaults);
                        return $modal.open(dialog).result;
                    };

                    return service;
                }
            ];
        }
    ]
);
