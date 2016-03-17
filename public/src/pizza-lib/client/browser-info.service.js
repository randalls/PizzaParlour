angular
.module(
    'pizza-lib.client.browser-info.service',
    []
)
.service(
    'BrowserInfo',
    [
        '$window',
        function($window) {
            'use strict';

            var userAgent = $window.navigator ? angular.lowercase($window.navigator.userAgent) : '';

            this.browser = {};
            this.OS = {};

            // regex patterns taken from https://github.com/ded/bowser/blob/master/bowser.js
            this.browser.isFirefox = /firefox|iceweasel/i.test(userAgent);
            this.browser.isMSIE = /msie|trident/i.test(userAgent);
            this.browser.isChrome = /chrome|crios|crmo/i.test(userAgent);
            this.browser.isPhantom = /PhantomJS/i.test(userAgent);

            this.OS.isIOS = /(ipod|iphone|ipad)/i.test(userAgent);
            this.OS.isIOS5 = this.OS.isIOS && /OS 5_[0-9_]+ like Mac OS X/i.test(userAgent);

            this.OS.isIDevice = (
                $window.navigator.platform === 'iPad' ||
                $window.navigator.platform === 'iPhone' ||
                $window.navigator.platform === 'iPad Simulator' ||
                $window.navigator.platform === 'iPhone Simulator'
            );

            this.isRetina = $window.devicePixelRatio >= 2;
        }
    ]
);
