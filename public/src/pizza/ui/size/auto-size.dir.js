// Taken and modified from https://github.com/angular-ui/ui-scrollpoint

angular
.module(
    'pizza.ui.size.auto-size.dir',
    [

    ]
).directive(
    'autoSize',
    [
        '$log',
        '$window',
        function($log, $window) {
            'use strict';

            return {
                require: '^targetSize',
                link: function(scope, elm, attr, targetSize) {

                    var winElement = angular.element($window),
                        target;

                    function onResize () {
                        target = targetSize.getHeight();
                        elm.css('height', target + 'px');
                    }

                    winElement.bind('resize', onResize);
                    onResize(); // sets the initial state

                    // Unbind scroll event handler when directive is removed
                    scope.$on('$destroy', function() {
                        winElement.unbind('scroll', onResize);
                    });

                    scope.$watch(
                        function () {
                            return targetSize.getHeight();
                        },
                        onResize
                    );

                    if (angular.isDefined(attr.scrollable)) {
                        elm.addClass('scrollable');
                    }

                    if (angular.isDefined(attr.overflow)) {
                        elm.css('overflow', attr.overflow);
                    }
                }
            };
        }
    ]
).directive(
    'targetSize',
    [
        '$log',
        function() {
            'use strict';

            return {
                controller: [
                    '$log',
                    '$element',
                    '$attrs',
                    function ($log, $element, $attr) {
                        var ctrl = this,
                            element = angular.element($element),
                            padding = $attr.padding ? (parseInt($attr.padding) * 2) : 0;

                        ctrl.getHeight = function () {
                            return element.prop('offsetHeight') - padding;
                        };
                    }
                ]
            };
        }
    ]
);
