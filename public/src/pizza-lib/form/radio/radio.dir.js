angular
.module(
    'pizza-lib.form.radio.radio-input.dir',
    [
        'pizza-lib.form.radio.radio-group.dir'
    ]
)
.directive(
    'radio',
    [
        '$log',
        function () {
            'use strict';
            return {
                scope: {
                    value: '=',
                    name: '@',
                    checked: '=',
                    disabled: '=?ngDisabled'
                },
                templateUrl: '/pizza-lib/form/radio/radio.html',
                require: ['radio', '^^radioGroup'],
                transclude: true,
                controller: [
                    '$scope',
                    function () {}
                ],
                controllerAs: 'ctrl',
                bindToController: true,
                link: function (scope, elm, attr, controllers) {
                    var radioCtrl = controllers[0],
                        groupCtrl = controllers[1];

                    radioCtrl.select = function (value) {
                        groupCtrl.select(value);
                    };
                    radioCtrl.parent = groupCtrl;
                }
            };
        }
    ]
);
