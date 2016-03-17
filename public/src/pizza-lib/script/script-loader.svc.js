angular
.module(
    'pizza-lib.script.script-loader.service',
    [

    ]
)
.service(
    'Script',
    [
        '$timeout',
        '$q',
        '$window',
        function ($interval, $q, $window) {
            'use strict';

            var service = {},
                maxAttempts = 10,
                time = 500,
                loaders = {};

            service.cancel = function (name) {
                if (name && loaders[name]) {
                    $interval.cancel(loaders[name]);
                    loaders[name] = null;
                }
            };

            service.load = function (path, name) {
                if (loaders[name]) { $q.reject(name + ' is already loading!'); }

                var deferred = $q.defer(),
                    scriptPath = '//' + path,
                    elm,
                    checker;

                elm = $window.document.createElement('script');
                elm.src = scriptPath;
                $window.document.getElementsByTagName('head')[0].appendChild(elm);

                checker = $interval(function () {
                    if ($window[name]) {
                        deferred.resolve($window[name]);
                        service.cancel(name);
                    }
                }, time, maxAttempts, false);

                checker.then(function () {
                    deferred.reject('Script took to long to load');
                    loaders[name] = null;
                });

                return deferred.promise;
            };

            return service;
        }
    ]
);
