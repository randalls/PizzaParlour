angular
.module(
    'vizzda-app.config.url',
    [
        'moment.js',
        'ui.router'
    ]
)
.config(
    [
        '$urlMatcherFactoryProvider',
        '$uiViewScrollProvider',
        function ($urlMatcherFactoryProvider, $uiViewScrollProvider) {
            'use strict';

            $uiViewScrollProvider.useAnchorScroll();
            $urlMatcherFactoryProvider.strictMode(false);

            $urlMatcherFactoryProvider.type(
                'moment',
                {},
                [
                    'moment',
                    function(moment) {
                        return {
                            encode: function(object) {
                                return object.format();
                            },
                            decode: function(value) {
                                return moment(value).isValid ? moment(value) : null;
                            },
                            is: function(object) {
                                return moment.isMoment(object);
                            },
                            equals: function(a, b) {
                                return moment(a).isSame(b);
                            }
                        };
                    }
                ]
            );
            
            $urlMatcherFactoryProvider.type(
                'guid',
                {},
                [
                    function () {
                        var GUID_REGEX = new RegExp(/^[a-f\d]{8}-([a-f\d]{4}-){3}[a-f\d]{12}$/i);

                        return {
                            encode: angular.identity,
                            decode: angular.identity,
                            is: function (item) {
                                return GUID_REGEX.test(item);
                            }
                        };
                    }
                ]
            );
        }
    ]
);
