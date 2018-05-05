(function (ng) {

  'use strict';

  var Module = ng.module('Imm');

  Module.controller('UserCtrl', ['$scope', '$state', '$stateParams', '$filter', 'AdminServices', 'ngDialog', function ($scope, $state, $stateParams, $filter, AdminServices, ngDialog) {

    var model    = "users";
    var idUser   = $stateParams.id;
    $scope.user  = {};
    $scope.sendingData = false;

    if (idUser) {
      AdminServices.getItem(model, idUser, function (err, user) {
        if (!err) {
          $scope.user = user;
        }
      });
    }

    $scope.save = function () {
      $scope.error = '';

      if (!$scope.user.name) {
        return $scope.error = $filter('translate')('catalogs.users.name');
      } 
      
      if (!$scope.user.email) {
        return $scope.error = $filter('translate')('catalogs.users.email');
      }

      $scope.sendingData = true;
      
      AdminServices.save(model, $scope.user, function (err, result) {
        if (err) {
          $scope.error = err;
          $scope.sendingData = false;
        } else {
          $state.go('app.catalogs.users');
        }
      });
    };

  }]);

}(angular));