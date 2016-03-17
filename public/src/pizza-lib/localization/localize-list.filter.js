angular
.module(
    'pizza-lib.localization.localize-list.fltr',
    [
        'pizza-lib.localization.messages.service'
    ]
)
.filter(
    'pizzaLocalizeList',
    [
        'pizzaMessages',
        function (Messages) {
            'use strict';

            return function (input) {
                var msg;

                if (!input) {
                    return '';
                }

                if (!angular.isString(input)) {
                    throw new TypeError('Unexpected argument type.');
                }

                msg = Messages.getMessageList(input);
                if (!msg) { return input; }
                return msg;
            };
        }
    ]
);
