angular
.module(
    'pizza.ui.dialog.basic-dialog.ctrl',
    [

    ]
)
.controller(
    'DialogCtrl',
    [
        function () {
            'use strict';

            var ctrl = this;

            ctrl.ok = function (ok, cb) {
                ctrl.$processing = true;
                return ok().then(cb).finally(function () {
                    ctrl.$processing = false;
                });
            };
        }
    ]
);
