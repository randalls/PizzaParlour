angular
.module(
    'pizza-lib.localization.localize.fltr',
    [
        'pizza-lib.localization.messages.service'
    ]
)
.filter(
    'pizzaLocalize',
    [
        'pizzaMessages',
        function (Messages) {
            'use strict';

            return function (input, interpolatedValues) {
                var msg;

                if (!input) {
                    return '';
                }

                if (!angular.isString(input)) {
                    throw new TypeError('Unexpected argument type.');
                }

                if (angular.isArray(interpolatedValues) && interpolatedValues.length > 0) {
                    msg = Messages.getInterpolatedMessage(input, interpolatedValues);
                } else {
                    msg = Messages.getMessage(input);
                }
                if (!msg) { return input; }
                return msg;
            };
        }
    ]
);
