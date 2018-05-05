(function (ng) {

  'use strict';

  var Module = ng.module('Imm');

  Module.controller('UsersCtrl', ['$scope', '$timeout', 'AdminServices', function ($scope, $timeout, AdminServices) {

    var model     = "users";
    $scope.users  = [];
    $scope.filter = {};
    $scope.query  = "";
    $scope.currentPage = 0;

    var timeout;
    $scope.$watch('filter', function () {
      $timeout.cancel(timeout);
      timeout = $timeout(function () {
        search();
      }, 250);
    }, true);

    function search() {
      $scope.query = "";
      
      if ($scope.filter.name) {
        $scope.query += "where[name][$like]=%" + $scope.filter.name + "%&";
      } 

      if ($scope.filter.email) {
        $scope.query += "where[email][$like]=%" + $scope.filter.email + "%&";
      } 

      $scope.currentPage = 0;

      AdminServices.getItems(model, $scope.query, $scope.currentPage, function (err, result, headers) {
        if (!err){
          $scope.users = result;
          $scope.total = headers('x-count-items');
        }
      });
    }

    $scope.pager = function (page) {
      var offset = PAGE_SIZE * (page - 1);
      AdminServices.getItems(model, $scope.query, offset, function (err, result) {
        if (!err) {
          $scope.users = result;  
        }
      });
    };

  }]);

}(angular));