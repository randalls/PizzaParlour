angular
.module('pizza.ui.status.filter', [])
.filter('projectStatus',
    [
        function() {
            'use strict';
            return function(input) {
                return ['introduced', 'in-progress', 'completed'][input || 0];
            };
        }
    ]
);
