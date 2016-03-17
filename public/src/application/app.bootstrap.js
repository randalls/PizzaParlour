angular
.module(
    'pizza-app',
    [
        'ngAria',
        'ngCookies',
        'ngAnimate',
        'ngTouch',
        'ngSanitize',
        'angularSlideables',

        'pizza-app.templates',

        'pizza-lib',

        'pizza-app.config.http',
        'pizza-app.config.location',
        'pizza-app.config.localization',
        'pizza-app.config.modal',
        'pizza-app.config.ui',

        'pizza-app.route.layout',
        'pizza-app.route.home',
        'pizza-app.route.menu',
        'pizza-app.route.create',

        'pizza-app.config.loading',
        'pizza.form.submit.submit-button.dir',
        'pizza-lib.ui.alert.alert.dir'
    ]
);
