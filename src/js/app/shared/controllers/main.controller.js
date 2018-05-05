(function (ng) {

  'use strict';

  var Module = ng.module('Imm');

  Module.run(function ($rootScope, $state, $window) {

    $rootScope.$on('$stateChangeSuccess', function (evt, toState, toParams, fromState, fromParams) {
      evt.preventDefault();

      var token = $window.sessionStorage[TOKEN_KEY];

      if ($state.current.name != "login" && !token) {
        $state.go('login');
      } else {
        $rootScope.token    = $window.sessionStorage[TOKEN_KEY];
        $rootScope.userId   = $window.sessionStorage["userId"];
        $rootScope.userName = $window.sessionStorage["userName"];
      }
    });
  });

  Module.controller('MainCtrl', ['$rootScope', '$scope', '$window', '$state', function ($rootScope, $scope, $window, $state) {

    $scope.thisHide = false;
    $scope.userToolsActive = false;

    $rootScope.toggleActive = function () {
      $scope.userToolsActive = !$scope.userToolsActive;
    };

    $scope.hideItems = function () {
      $scope.thisHide = !$scope.thisHide;
    };

    // Check for defined session values
    if (!$window.sessionStorage[TOKEN_KEY]) {
      console.log('You are not logged in');
      $state.go('login');
    } else {
      console.log('Welcome back', $window.sessionStorage["userName"]);
      $rootScope.token    = $window.sessionStorage[TOKEN_KEY];
      $rootScope.userId   = $window.sessionStorage["userId"];
      $rootScope.userName = $window.sessionStorage["userName"];
    }

  }]);

}(angular));