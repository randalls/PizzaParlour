angular
.module(
    'pizza-lib.parse.options.service',
    [
        'pizza-lib.util.test.service',
        'pizza-lib.util.hash.service'
    ]
)
.service(
    'Options',
    [
        '$parse',
        'Test',
        'Hash',
        function ($parse, Test, Hash) {
            'use strict';
            var OPTIONS_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/;

            return {
                parse: function (optionsExp, scope) {
                    var match = optionsExp.match(OPTIONS_REGEXP);

                    if (!(match)) {
                        throw new Error('Expected expression in form of "_select_ (as _label_)? for (_key_,)?_value_ in _collection_"');
                    }

                    // Extract the parts from the ngOptions expression

                    var valueName = match[5] || match[7], // The variable name for the value of the item in the collection
                        keyName = match[6], // The variable name for the key of the item in the collection
                        selectAs = / as /.test(match[0]) && match[1], // An expression that generates the viewValue for an option if there is a label expression
                        trackBy = match[9], // An expression that is used to track the id of each object in the options collection
                        valueFn = $parse(match[2] ? match[1] : valueName), // An expression that generates the viewValue for an option if there is no label expression
                        selectAsFn = selectAs && $parse(selectAs),
                        viewValueFn = selectAsFn || valueFn,
                        trackByFn = trackBy && $parse(trackBy),
                        displayFn = $parse(match[2] || match[1]),
                        groupByFn = $parse(match[3] || ''),
                        disableWhenFn = $parse(match[4] || ''),
                        valuesFn = $parse(match[8]),
                        locals = {};

                    // Get the value by which we are going to track the option
                    // if we have a trackFn then use that (passing scope and locals)
                    // otherwise just hash the given viewValue
                    var getTrackByValueFn = trackBy ?
                            function(value, locals) { return trackByFn(scope, locals); } :
                            function getHashOfValue(value) { return Hash.getKey(value); };

                    var getTrackByValue = function(value, key) {
                        return getTrackByValueFn(value, getLocals(value, key));
                    };

                    var getLocals = keyName ? function(value, key) {
                            locals[keyName] = key;
                            locals[valueName] = value;
                            return locals;
                        } : function(value) {
                          locals[valueName] = value;
                          return locals;
                        };

                    function Option(selectValue, viewValue, label, group, disabled) {
                        this.selectValue = selectValue;
                        this.viewValue = viewValue;
                        this.label = label;
                        this.group = group;
                        this.disabled = disabled;
                    }

                    return {
                        trackBy: trackBy,
                        getTrackByValue: getTrackByValue,
                        getWatchables: $parse(valuesFn, function(values) {
                            // Create a collection of things that we would like to watch (watchedArray)
                            // so that they can all be watched using a single $watchCollection
                            // that only runs the handler once if anything changes
                            var watchedArray = [];
                            values = values || [];

                            Object.keys(values).forEach(function getWatchable(key) {
                                if (key.charAt(0) === '$') { return; }
                                var locals = getLocals(values[key], key);
                                var selectValue = getTrackByValueFn(values[key], locals);
                                watchedArray.push(selectValue);

                                // Only need to watch the displayFn if there is a specific label expression
                                if (match[2] || match[1]) {
                                    var label = displayFn(scope, locals);
                                    watchedArray.push(label);
                                }

                                // Only need to watch the disableWhenFn if there is a specific disable expression
                                if (match[4]) {
                                    var disableWhen = disableWhenFn(scope, locals);
                                    watchedArray.push(disableWhen);
                                }
                            });
                            return watchedArray;
                        }),
                        getOptions: function() {

                            var optionItems = [];
                            var selectValueMap = {};

                            // The option values were already computed in the `getWatchables` fn,
                            // which must have been called to trigger `getOptions`
                            var optionValues = valuesFn(scope) || [];
                            var optionValuesKeys;

                            if (!keyName && Test.isArrayLike(optionValues)) {
                                optionValuesKeys = optionValues;
                            } else {
                                // if object, extract keys, in enumeration order, unsorted
                                optionValuesKeys = [];
                                for (var itemKey in optionValues) {
                                    if (optionValues.hasOwnProperty(itemKey) && itemKey.charAt(0) !== '$') {
                                        optionValuesKeys.push(itemKey);
                                    }
                                }
                            }
                            var optionValuesLength = optionValuesKeys.length;

                            for (var index = 0; index < optionValuesLength; index++) {
                                var key = (optionValues === optionValuesKeys) ? index : optionValuesKeys[index],
                                    value = optionValues[key],
                                    locals = getLocals(value, key),
                                    viewValue = viewValueFn(scope, locals),
                                    selectValue = getTrackByValueFn(viewValue, locals),
                                    label = displayFn(scope, locals),
                                    group = groupByFn(scope, locals),
                                    disabled = disableWhenFn(scope, locals),
                                    optionItem = new Option(selectValue, viewValue, label, group, disabled);

                                optionItems.push(optionItem);
                                selectValueMap[selectValue] = optionItem;
                            }

                            return {
                                items: optionItems,
                                selectValueMap: selectValueMap,
                                getOptionFromViewValue: function(value) {
                                    return selectValueMap[getTrackByValue(value)];
                                },
                                getViewValueFromOption: function(option) {
                                    // If the viewValue could be an object that may be mutated by the application,
                                    // we need to make a copy and not return the reference to the value on the option.
                                    return trackBy ? angular.copy(option.viewValue) : option.viewValue;
                                }
                            };
                        }
                    };
                }
            };
        }
    ]
);
