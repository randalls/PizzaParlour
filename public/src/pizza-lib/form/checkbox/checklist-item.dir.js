angular
.module(
    'pizza-lib.form.checkbox.checklist-item.dir',
    [

    ]
)
.directive(
    'checklistItem',
    [
        '$log',
        function () {
            'use strict';
            return {
                scope: {
                    value: '=',
                    disabled: '=?ngDisabled'
                },
                transclude: true,
                require: ['^^checklist', 'checklistItem'],
                templateUrl: '/pizza-lib/form/checkbox/checklist-item.html',
                controller: [
                    function () {
                        var ctrl = this;

                        ctrl.toggle = function () {
                            ctrl.checked = !ctrl.checked;
                        };
                    }
                ],
                controllerAs: 'ctrl',
                bindToController: true,
                link: function (scope, elm, attr, controllers) {
                    var list = controllers[0],
                        item = controllers[1];

                    item.checked = list.isChecked(item.value);

                    scope.$watch(
                        'ctrl.checked',
                        function (n, o) {
                            if (n !== o) {
                                list[n ? 'add' : 'remove'](item.value);
                            }
                        }
                    );
                }
            };
        }
    ]
);
