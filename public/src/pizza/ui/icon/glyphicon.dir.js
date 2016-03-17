angular
.module(
    'pizza.ui.icon.glyphicon.dir',
    [

    ]
)
.directive(
    'glyphicon',
    [
        function () {
            'use strict';

            return {
                restrict: 'C',
                link: function (scope, elm) {
                    elm.removeClass('glyphicon');
                    elm.addClass('material-icons');
                }
            };
        }
    ]
);
