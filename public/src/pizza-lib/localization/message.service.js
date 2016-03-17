angular
.module(
    'pizza-lib.localization.messages.service',
    []
)
.provider(
    'pizzaMessages',
    [

        function() {
            'use strict';

            var MessagesProvider = this,
                languageFiles = {
                    en: []
                },
                provided = {},
                autoLoad = true,
                currentLocale = 'en',
                availableLocales = {};

            // add a language file to be preloaded
            MessagesProvider.addLanguageFile = function(locale, langFile) {
                if (!angular.isArray(languageFiles[locale])) {
                    languageFiles[locale] = [];
                }

                if (languageFiles[locale].indexOf(langFile) >= 0) {
                    throw new Error('[MessagesProvider] Duplicate language file: ' + langFile);
                }

                languageFiles[locale].push(langFile);
            };

            // toggle autoLoad (true by default)
            MessagesProvider.setAutoLoad = function(val) {
                autoLoad = !!val;
            };

            // add raw json object to the pre-load
            MessagesProvider.addCache = function(locale, path, codes) {
                if (!angular.isArray(provided[locale])) {
                    provided[locale] = [];
                }
                provided[locale].push({
                    path: path,
                    codes: codes
                });
            };

            // configure the default locale during loads
            MessagesProvider.setCurrentLocale = function(locale) {
                if (Object.keys(availableLocales).indexOf(locale) >= 0) {
                    currentLocale = locale;
                } else {
                    throw new Error('[MessagesProvider] Requested locale does not exist: ' + locale);
                }
            };

            MessagesProvider.$get = [
                '$http',
                '$log',
                '$q',
                '$filter',
                '$cacheFactory',
                function($http, $log, $q, $filter, $cacheFactory) {
                    var service = this,
                        messagesCache = $cacheFactory('messagesCache'),
                        messageFilesCache = $cacheFactory('messagesFilesCache');

                    service.autoLoad = autoLoad;

                    // load the provided json objects into cache
                    angular.forEach(provided, function(files, localeKey) {
                        var messages = messagesCache.get(localeKey);
                        if (!messages) {
                            messages = {};
                        }
                        angular.forEach(files, function(entry) {
                            messageFilesCache.put(entry.path, entry.codes);

                            angular.extend(messages, entry.codes);
                        });

                        messagesCache.put(localeKey, messages);
                    });

                    // allow configuration during runtime as well (for settings switch)
                    service.setCurrentLocale = MessagesProvider.setCurrentLocale;

                    service.getCurrentLocale = function() {
                        return currentLocale;
                    };

                    // handles pre-loading and loading of groups of files
                    // warning! will set currentLocale to last loaded locale,
                    // unless preload is set
                    service.load = function(locale, files, preload) {
                        var promises = [$q.when(1)];

                        // add in any last minute files
                        if (angular.isArray(files)) {
                            angular.forEach(files, function(f) {
                                MessagesProvider.addLanguageFile(locale, f);
                            });
                        } else if (angular.isString(files)) {
                            MessagesProvider.addLanguageFile(locale, files);
                        }

                        locale = locale || currentLocale || 'en';
                        // the act of loading a locale makes it available, even if there are no codes
                        // must happen before set is called due to exception throwing
                        availableLocales[locale] = true;
                        if (!preload) {
                            service.setCurrentLocale(locale);
                        }

                        angular.forEach(languageFiles[locale], function(langFile) {
                            var promise;

                            // langfile should be a full path, nothing is assumed
                            $log.debug('[MessagesProvider] loading file: ', langFile);

                            if (messageFilesCache.get(langFile)) {
                                promise = $q.when(messageFilesCache.get(langFile));
                            } else {
                                promise = $http.get(langFile, {
                                    cache: true
                                }).then(
                                    function(response) {
                                        messageFilesCache.put(langFile, response.data);

                                        return response.data;
                                    },
                                    function(response) {
                                        return $q.reject(response);
                                    }
                                );
                            }

                            promises.push(promise);
                        });

                        return $q.all(promises)
                            .then(function(responseDataArray) {
                                angular.forEach(responseDataArray, function(data) {
                                    var messages = messagesCache.get(locale);
                                    if (!messages) {
                                        messages = {};
                                    }
                                    angular.extend(messages, data);
                                    messagesCache.put(locale, messages);
                                });
                            }, function(err) {
                                return $q.reject(err);
                            });
                    };

                    // gets a message from the json obj, using dot notation
                    service.getMessage = function(code, getJson, overrideLocale) {
                        var messageKeys,
                            locale = overrideLocale || currentLocale,
                            result,
                            index;

                        messageKeys = code.split('.');

                        result = messagesCache.get(locale);

                        if (!result) {
                            $log.warn('[Messages] No messages loaded for: ', locale);
                            return null;
                        }

                        for (index = 0; index < messageKeys.length; index++) {
                            if (result[messageKeys[index]]) {
                                result = result[messageKeys[index]];
                            } else {
                                result = null;
                                break;
                            }
                        }

                        if (result === null) {
                            $log.warn('[Messages] ', code, ' produced null result for locale ', locale);
                        }

                        if (getJson) {
                            return result;
                        }

                        // we don't want to allow the actual object chunk returned here...
                        // so an incomplete code will result in null here, only strings!
                        return angular.isString(result) ? result : null;
                    };

                    service.getMessageList = function(code, getJson, overrideLocale) {
                        var messageKeys,
                            locale = overrideLocale || currentLocale,
                            result,
                            index;

                        messageKeys = code.split('.');

                        result = messagesCache.get(locale);

                        if (!result) {
                            $log.warn('[Messages] No messages loaded for: ', locale);
                            return null;
                        }

                        for (index = 0; index < messageKeys.length; index++) {
                            if (result[messageKeys[index]]) {
                                result = result[messageKeys[index]];
                            } else {
                                result = null;
                                break;
                            }
                        }

                        if (result === null) {
                            $log.warn('[Messages] ', code, ' produced null result for locale ', locale);
                        }

                        if (getJson) {
                            return result;
                        }

                        // we don't want to allow the actual object chunk returned here...
                        // so an incomplete code will result in null here, only strings!
                        return angular.isArray(result) ? result.join(', ') : null;
                    };

                    service.getInterpolatedMessage = function(code, values) {
                        var msg = service.getMessage(code),
                            v;

                        if (msg === null) {
                            msg = '';
                        }

                        for (v = 0; v < values.length; v += 1) {
                            msg = msg.replace('{' + v + '}', values[v] || '');
                        }

                        return msg;
                    };

                    service.get = function (code, values) {
                        if (values) {
                            return service.getInterpolatedMessage(code, values);
                        } else {
                            return service.getMessage(code);
                        }
                    };

                    service.getMessageOrDefault = function(code, defaultValue) {
                        var msg = service.getMessage(code);
                        return msg === null ? defaultValue : msg;
                    };

                    return service;
                }
            ];

        }
    ]
);
