(function (ng) {

  'use strict';

  // Webapp module
  var app = ng.module('Imm');

  app.run(['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.pageSize = PAGE_SIZE;
    }
  ]);

  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(false);

    if (window.sessionStorage[TOKEN_KEY]) {
      $urlRouterProvider.otherwise("/app/pvas");
    } else {
      $urlRouterProvider.otherwise("/login");
    }

    $stateProvider.state("Default", {});

    $stateProvider
      .state('app', {
        abstract: true,
        url: '/app',
        templateUrl: 'app/shared/views/app.html',
        controller: 'MainCtrl'
      })

      // LOGIN
      .state('login', {
        url: '/login',
        templateUrl: 'app/components/session/views/indexView.html',
        controller: 'AuthCtrl'
      })
      .state('app.dashboard', {
          url: '/dashboard',
          templateUrl: 'app/components/dashboard/views/indexView.html'
      })

      // CATALOGS APP
      .state('app.catalogs', {
          abstract: true,
          url: '/catalogs',
          templateUrl: 'app/components/catalogs/views/indexView.html'
      })
      .state('app.catalogs.dashboard', {
          url: '/dashboard',
          templateUrl: 'app/components/catalogs/components/dashboard/views/dashboardView.html'
      })

      // USERS
      .state('app.catalogs.users', {
        url: '/users',
        templateUrl: 'app/components/catalogs/components/users/views/usersView.html',
        controller: 'UsersCtrl'
      })
      .state('app.catalogs.userNew', {
        url: '/user/new',
        templateUrl: 'app/components/catalogs/components/users/views/userFormView.html',
        controller: 'UserCtrl'
      })
      .state('app.catalogs.userEdit', {
        url: '/user/edit/:id',
        templateUrl: 'app/components/catalogs/components/users/views/userFormView.html',
        controller: 'UserCtrl'
      })

      // PRICES
      .state('app.prices', {
          url: '/prices',
          templateUrl: 'app/components/prices/views/pricesView.html',
          controller: 'PricesCtrl'
      })
      .state('app.priceNew', {
          url: '/price/new',
          templateUrl: 'app/components/prices/views/priceFormView.html',
          controller: 'AlertCtrl'
      })
      .state('app.priceEdit', {
          url: '/price/:id/edit',
          templateUrl: 'app/components/prices/views/priceFormView.html',
          controller: 'PriceCtrl'
      })

  }]);

}(angular));