angular
.module(
    'pizza-app.config.localization',
    [
        'pizza-lib.localization.messages.service',
        'pizza-lib.localization.localize.fltr',
        'pizza-lib.localization.localize-list.fltr'
    ]
)
.config(
    [
        'pizzaMessagesProvider',
        'LANG_FILE',
        function (MessagesProvider, LANG_FILE) {
            'use strict';

            MessagesProvider.addCache('en', 'vp', LANG_FILE);
        }
    ]
)
.run(
    [
        'pizzaMessages',
        '$log',
        '$rootScope',
        function(Messages, $log, $rootScope) {
            'use strict';

            var locale = 'en';

            Messages.load(locale).then(function () {
                $rootScope.locale = locale;
            });
        }
    ]
);
