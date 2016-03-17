angular
.module(
    'pizza.form.has-validation.dir',
    []
)
.directive(
    'hasValidation',
    [
        function () {
            'use strict';
            var classes = [
                    'has-error',
                    'has-success',
                    'has-warning'
                ].join(' ');

            function getControlClass (input) {
                if (!input || input.$pristine) { return; }
                if (input.$valid) { return 'has-success'; }
                if (input.$invalid && !input.$pristine) { return 'has-error'; }
                return;
            }
            function getIconClass (input) {
                if (!input || input.$pristine) { return; }
                //if (input.$valid) { return '&#xE876;'; }
                if (input.$invalid && !input.$pristine) { return '&#xE14B;'; }
                return;
            }

            return {
                scope: {
                    input: '=hasValidation',
                    useIcon: '=?icon'
                },
                transclude: true,
                templateUrl: '/pizza/form/has-validation.html',
                link: function (scope, elm) {
                    function update () {
                        elm.removeClass(classes);
                        elm.addClass(getControlClass(scope.input));
                        if (elm.find('input').length && scope.useIcon) {
                            scope.icon = getIconClass(scope.input);
                        }
                    }

                    elm.addClass('has-feedback');
                    scope.useIcon = angular.isDefined(scope.useIcon) ? scope.useIcon : true;
                    scope.$watch('input.$viewValue', update);
                    scope.$watch('input.$valid', update);
                }
            };
        }
    ]
);
