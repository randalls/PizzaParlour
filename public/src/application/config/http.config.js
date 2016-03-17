angular
.module(
    'pizza-app.config.http',
    [
        'pizza-app.constants',
        'pizza-lib.http.api.service'
    ]
)
.config(
    [
        '$locationProvider',
        '$httpProvider',
        function ($locationProvider, $httpProvider) {
            'use strict';

            $httpProvider.defaults.headers.common['Content-Type'] = $httpProvider.defaults.headers.post['Content-Type'];
        }
    ]
)
.config(
    [
        'pizzaApiProvider',
        'API_URL',
        function (ApiProvider, API_URL) {
            'use strict';

            ApiProvider.setApiPath(API_URL);
        }
    ]
);
