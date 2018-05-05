/**
 * Created by agustin on 22/11/17.
 */
(function (ng) {

  "use strict";

  var Module = ng.module('Imm');

  Module.directive('uiSelectKona', function () {

    var directive = {
      restrict: 'E',
      scope: {
        model: '=',
        array: '=',
        title: '=',
        placeholder: '='
      },
      templateUrl: '/app/shared/directives/ui-select.view.html'
    };

    return directive;

  });

}(angular));