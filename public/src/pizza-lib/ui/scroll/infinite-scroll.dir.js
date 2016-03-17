angular
.module(
    'pizza-lib.ui.scroll.infinite-scroll.dir',
    [

    ]
)
.directive(
    'pizzaInfiniteScroll',
    [
        '$log',
        '$window',
        '$document',
        function ($log, $window, $document) {
            'use strict';
            return {
                link: function (scope, elm, attr) {
                    var win = angular.element($window),
                        doc = angular.element($document),
                        body = doc[0].body,
                        threshold = 100,
                        pageHeight,
                        scrollPosition,
                        scrollMax,
                        checker;

                    checker = function () {
                        if (scrollPosition >= $window.pageYOffset) {
                            scrollPosition = $window.pageYOffset;
                            return;
                        }

                        pageHeight = body.scrollHeight;
                        scrollPosition = $window.pageYOffset;
                        scrollMax = $window.pageYOffset + $window.innerHeight;

                        if (scrollMax >= pageHeight - threshold) {
                            win.unbind('scroll', checker);
                            scope.$eval(attr.pizzaInfiniteScroll)().then(function (response) {
                                win.bind('scroll', checker);
                            });
                        }
                    };

                    win.bind('scroll', checker);
                }
            };
        }
    ]
);
