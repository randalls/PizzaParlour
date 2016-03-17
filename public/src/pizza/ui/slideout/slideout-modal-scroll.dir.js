angular
.module(
    'pizza.ui.slideout.slideout-modal-scroll.dir',
    []
)
.directive(
    'slideoutModalScroll',
    [
        '$log',
        '$window',
        '$document',
        '$timeout',
        function ($log, $window, $document, $timeout) {
            'use strict';
            return {
                link: function (scope, elm) {
                    var win = angular.element($window);

                    function update () {
                        var windowHeight = $window.innerHeight,
                            body = elm.find('section'),
                            header = elm.find('header'),
                            footer = elm.find('footer'),
                            headerHeight = header[0].offsetHeight,
                            footerHeight = footer[0].offsetHeight,
                            totalHeight = windowHeight - headerHeight - footerHeight;

                        body.css('max-height', totalHeight + 'px');
                    }

                    $timeout(update, 1);

                    win.on('resize', update);
                }
            };
        }
    ]
);
