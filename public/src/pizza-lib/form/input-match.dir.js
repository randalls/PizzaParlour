angular
.module(
    'pizza-lib.form.input-match.dir',
    []
)
.directive(
    'pizzaInputMatch',
    [
        function () {
            'use strict';
            return {
                require: 'ngModel',
                link: function (scope, elm, attrs, ctrl) {
                    ctrl.$parsers.unshift(
                        function (viewValue) {
                            var val = scope.$eval(attrs.pizzaInputMatch);
                            if (String(viewValue) !== String(val)) {
                                ctrl.$setValidity('match', false);
                                return undefined;
                            } else {
                                ctrl.$setValidity('match', true);
                                return viewValue;
                            }
                        }
                    );
                }
            };
        }
    ]
);
