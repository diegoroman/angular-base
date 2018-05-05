(function (ng) {

  'use strict';

  var Module = ng.module('Imm');

  Module.controller('AuthCtrl', ['$scope', '$rootScope', '$window', 'RestClient', '$state', '$filter', function ($scope, $rootScope, $window, RestClient, $state, $filter) {

      $scope.user = {
        email: '',
        password: ''
      };

      // AUTO FOCUS
      jQuery('input[type=email]').focus();
      
      $window.sessionStorage["userId"]   = "";
      $window.sessionStorage["userName"] = "";

      if ($window.sessionStorage[TOKEN_KEY]) {
        $state.go('app.prices');
      }

      $scope.authenticate = function () {

        window.sessionStorage.setItem(TOKEN_KEY, true);
        
        RestClient.post('users/login', $scope.user, function (err, result) {
          if (err) {
            if (typeof callback === 'function') {
              callback(err, result);
            }
            $scope.error = $filter('translate')('session.error_email_password');
          }
          else {
            // LOCAL STORAGE
            $window.sessionStorage[TOKEN_KEY]  = result.token;
            $window.sessionStorage["userId"]   = result.user.id;
            $window.sessionStorage["userName"] = result.user.name;
            $rootScope.userId   = $window.sessionStorage["userId"];
            $rootScope.userName = $window.sessionStorage["userName"];
            $state.go('app.prices');
          }
        });
      };
    }
  ]);
}(angular));