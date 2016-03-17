angular
.module(
    'pizza.ui.affix.affix-element.dir',
    [

    ]
)
.directive(
    'affixElement',
    [
        '$log',
        '$window',
        function ($log, $window) {
            'use strict';

            function getWindowScrollTop() {
                if (angular.isDefined($window.pageYOffset)) {
                    return $window.pageYOffset;
                } else {
                    var iebody = (document.compatMode && document.compatMode !== 'BackCompat') ? document.documentElement : document.body;
                    return iebody.scrollTop;
                }
            }

            return {
                require: '^?affixTarget',
                link: function (scope, elm, attrs, affixElementTarget) {
                    var absolute = true,
                        shift = 0,
                        fixLimit,
                        affixClass = attrs.affixClass || 'affix',
                        $target = affixElementTarget && affixElementTarget.$element || angular.element($window);

                    if (!attrs.affixElement) {
                        absolute = false;
                    } else if (typeof(attrs.affixElement) === 'string') {
                    // charAt is generally faster than indexOf: http://jsperf.com/indexof-vs-charat
                        if (attrs.affixElement.charAt(0) === '-') {
                            absolute = false;
                            shift = -parseFloat(attrs.affixElement.substr(1));
                        } else if (attrs.affixElement.charAt(0) === '+') {
                            absolute = false;
                            shift = parseFloat(attrs.affixElement.substr(1));
                        }
                    }

                    fixLimit = absolute ? attrs.affixElement : elm[0].offsetTop + shift;

                    function onScroll() {

                        var limit = absolute ? attrs.affixElement : elm[0].offsetTop + shift;

                        // if pageYOffset is defined use it, otherwise use other crap for IE
                        var offset = affixElementTarget ? $target[0].scrollTop : getWindowScrollTop();
                        if (!elm.hasClass(affixClass) && offset > limit) {
                            elm.addClass(affixClass);
                            elm.css('width', elm.parent()[0].scrollWidth + 'px');
                            fixLimit = limit;
                        } else if (elm.hasClass(affixClass) && offset < fixLimit) {
                            elm.removeClass(affixClass);
                            elm.css('width', 'auto');
                        }
                    }

                    $target.on('scroll', onScroll);

                    // Unbind scroll event handler when directive is removed
                    scope.$on('$destroy', function() {
                        $target.off('scroll', onScroll);
                    });

                    onScroll();
                }
            };
        }
    ]
)
.directive('affixElementTarget',
    [
        function () {
            'use strict';
            return {
                controller: [
                    '$element',
                    function($element) {
                        this.$element = $element;
                    }
                ]
            };
        }
    ]
);
