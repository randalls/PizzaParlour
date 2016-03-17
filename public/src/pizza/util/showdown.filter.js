angular
.module(
    'pizza.util.showdown.filter',
    [
        'showdown.js'
    ]
)
.filter(
    'showdown',
    [
        '$sce',
        'showdown',
        function($sce, showdown) {
            'use strict';
            var converter = new showdown.Converter();

            return function(input) {
                return $sce.trustAs('html', converter.makeHtml(input));
            };
        }
    ]
);
