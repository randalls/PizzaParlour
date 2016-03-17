angular
.module(
    'pizza-lib.ui.carousel.slide.dir',
    [
        'pizza-lib.ui.carousel.carousel.dir'
    ]
)
.directive(
    'pizzaSlide',
    [
        function () {
            'use strict';
            return {
                require: '^pizzaCarousel',
                scope: {
                    slide: '=pizzaSlide'
                },
                templateUrl: '/pizza-lib/ui/carousel/slide.html',
                link: function (scope, elm, attr, carousel) {
                    carousel.addSlide(scope, elm);
                    elm.addClass('item');
                    //when the scope is destroyed then remove the slide from the current slides array
                    scope.$on('$destroy', function() {
                        carousel.removeSlide(scope);
                    });

                    scope.$watch('active', function(active) {
                        if (active) {
                            carousel.select(scope);
                        }
                    });
                },
                transclude: true
            };
        }
    ]
);
