(function (ng) {

    "use strict";

    var Module = ng.module('Imm');

    Module.directive('status', function () {

        var directive = {
            restrict: 'E',
            scope: {
                value: '=',
                showLabels: '=',
                showIcon: '='
            },
            templateUrl: '/app/shared/directives/status.view.html'
        };

        return directive;

    });

}(angular));