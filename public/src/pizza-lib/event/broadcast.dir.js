angular
.module(
    'pizza-lib.event.broadcast.dir',
    []
)
.directive(
    'broadcast',
    [
        '$rootScope',
        function ($rootScope) {
            'use strict';
            return {
                priority:1000,
                link:function (scope, element, attr) {
                    var ev, args;
                    element.on('click touchend', function () {
                        ev = attr.broadcast;
                        args = [];

                        if (attr.broadcastArgs) {
                            args = scope.$eval(attr.broadcastArgs);
                        }

                        args.unshift(ev);

                        $rootScope.$broadcast.apply(scope, args);
                    });
                }
            };
        }
    ]
);
