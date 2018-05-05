(function(ng) {

    'use strict';

    var Module = ng.module('Imm');

    Module.directive('immLoader', function() {
        var directive;

        directive = {
            restrict: 'E',
            scope: {
                visible: '='
            },
            templateUrl: '/app/shared/directives/loader.view.html',
            link: function(scope, element, attrs) {

            }
        };

        return directive;
    });

}(angular));
