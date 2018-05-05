(function (ng) {

  'use strict';

  var Module = ng.module('Imm');

  Module.controller('PricesCtrl', ['$rootScope', '$scope', '$timeout', 'AdminServices', 'ngDialog', '$state', '$filter', function ($rootScope, $scope, $timeout, AdminServices, ngDialog, $state, $filter) {

    var model          = "prices";
    $scope.prices      = [];
    $scope.filter      = {};
    $scope.query       = "";
    $scope.currentPage = 0;
    $scope.pageSize    = PAGE_SIZE;

    var timeout;
    $scope.$watch('filter', function () {
      $timeout.cancel(timeout);
      timeout = $timeout(function () {
        search();
      }, 250);
    }, true);

    function search() {
      $scope.query = "";

      if ($scope.filter.id) {
        $scope.query += "&where[id]=" + $scope.filter.id;
      }

      if ($scope.filter.name) {
        var name = ($scope.filter.name).split(' ').join('_');
        $scope.query += "&where[name][$like]=%" + name + "%";
      } 

      $scope.currentPage = 0;

      /*AdminServices.getItems(model, $scope.query, $scope.currentPage, function (err, result, headers) {
        if (!err) {
          $scope.prices = result;
          $scope.total = headers('x-count-items');
        }
      });*/
    }

    function parseDate(item) {
      item.updated_at = moment().format('MMMM DD, YYYY');
    }

    $scope.pager = function (page) {
      var offset = PAGE_SIZE * (page - 1);
      AdminServices.getItems(model, $scope.query, offset, function (err, result) {
        if (!err) {
          $scope.prices = result;
        }
      });
    };

  }]);

}(angular));