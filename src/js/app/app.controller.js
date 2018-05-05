(function (ng) {

  'use strict';

  var Module = ng.module('Imm');

  Module.controller('AppCtrl', ['$scope', '$window', '$rootScope', '$state', '$translate', function ($scope, $window, $rootScope, $state, $translate) {
    // ---- Initialization

    // Put here stuff that can be deferred for the next digest
    $scope.$evalAsync(function () {
      
    });

    $rootScope.logout = function () {
      $window.sessionStorage.clear();
      $rootScope.userId   = '';
      $rootScope.userName = '';
      $rootScope.token    = '';
      $state.go('login');
    };

    $scope.$on('$routeChangeSuccess', function (e, currentRoute) {
      //Change page title, based on Route information
      if (currentRoute && currentRoute.title) {
        $window.title = currentRoute.title;
      }
    });

    $rootScope.$on('$stateChangeStart', function (e, currentRoute) {

    })

    $scope.changeLanguage = function (langKey) {
      $translate.use(langKey);
    };
    $scope.changeLanguage('es');

  }]);

}(angular));