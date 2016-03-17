angular
.module(
    'pizza-app.config.modal',
    [
        'ui.bootstrap'
    ]
)
.config(
    [
        '$uibModalProvider',
        function ($modalProvider) {
            'use strict';

            angular.extend(
                $modalProvider.options,
                {
                    windowTemplateUrl: '/pizza/ui/modal/modal-window.html',
                    windowTopClass: 'modal-active'
                }
            );
        }
    ]
);
