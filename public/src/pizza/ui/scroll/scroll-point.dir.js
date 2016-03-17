// Taken and modified from https://github.com/angular-ui/ui-scrollpoint

angular
.module(
    'pizza.ui.scroll.scroll-point.dir',
    [

    ]
).directive(
    'scrollpoint',
    [
        '$log',
        '$window',
        function($log, $window) {
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
                require: '^?scrollpointTarget',
                link: function(scope, elm, attrs, scrollpointTarget) {
                    var absolute = true,
                        shift = 0,
                        fixLimit,
                        $target = scrollpointTarget && scrollpointTarget.$element || angular.element($window),
                        scrollClass = (attrs.scrollpoint) ? attrs.scrollpoint : attrs.scrollpointClass ? attrs.scrollpointClass : 'scrollpoint';

                    if (!attrs.offset) {
                        absolute = false;
                    } else if (typeof (attrs.offset) === 'string') {
                        // charAt is generally faster than indexOf: http://jsperf.com/indexof-vs-charat
                        if (attrs.offset.charAt(0) === '-') {
                            absolute = false;
                            shift = -parseFloat(attrs.offset.substr(1));
                        } else if (attrs.offset.charAt(0) === '+') {
                            absolute = false;
                            shift = parseFloat(attrs.offset.substr(1));
                        }
                    }

                    fixLimit = absolute ? attrs.offset : elm[0].offsetTop + shift;

                    function onScroll() {

                        var limit = absolute ? attrs.offset : elm[0].offsetTop + shift,
                            offset = scrollpointTarget ? $target[0].scrollTop : getWindowScrollTop();

                        // if pageYOffset is defined use it, otherwise use other crap for IE
                        if (!elm.hasClass(scrollClass) && offset >= limit) {
                            elm.addClass(scrollClass);
                            fixLimit = limit;
                        } else if (elm.hasClass(scrollClass) && offset < fixLimit) {
                            elm.removeClass(scrollClass);
                        }
                    }

                    $target.on('scroll', onScroll);
                    onScroll(); // sets the initial state

                    // Unbind scroll event handler when directive is removed
                    scope.$on('$destroy', function() {
                        $target.off('scroll', onScroll);
                    });
                }
            };
        }
    ]
).directive(
    'scrollpointTarget', [
        function() {
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
