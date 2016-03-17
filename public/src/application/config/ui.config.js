angular
.module(
    'pizza-app.config.ui',
    [
        'pizza-lib.ui.alert.alert.dir'
    ]
)
.config(
    [
        '$provide',
        function ($provide) {
            'use strict';

            $provide.decorator(
                'pizzaAlertDirective',
                [
                    '$delegate',
                    function($delegate) {
                        var directive = $delegate[0];
                        directive.templateUrl = '/pizza/ui/alert/alert.html';
                        return $delegate;
                    }
                ]
            );

            $provide.decorator(
                'pizzaAlertContainerDirective',
                [
                    '$delegate',
                    function($delegate) {
                        var directive = $delegate[0];
                        directive.templateUrl = '/pizza/ui/alert/alert-container.html';
                        return $delegate;
                    }
                ]
            );
        }
    ]
);
