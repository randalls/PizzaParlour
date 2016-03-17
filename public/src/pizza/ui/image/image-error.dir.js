angular
.module(
    'pizza.ui.image.img-error.dir',
    []
)
.directive(
    'img',
    [
        function () {
            'use strict';
            return {
                link: function (scope, element) {
                     element.on('error', function () {
                         element.css({display: 'none'});
                     });
                }
            };
        }
    ]
);
