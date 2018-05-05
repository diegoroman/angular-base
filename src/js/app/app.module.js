var PAGE_SIZE = 15;
var TOKEN_KEY = 'app-admin-token';

var Imm = Imm || {};

(function (ng) {

  'use strict';

  ng.module('Imm', [
    'ngRoute',
    'ngSanitize',
    'ui.router',
    'ngProgress',
    'ngDialog',
    'ui.select',
    'bw.paging',
    'pascalprecht.translate',
    'ui.bootstrap'
  ]).config(['$httpProvider', '$translateProvider', function ($httpProvider, $translateProvider) {

    $httpProvider.useApplyAsync(true);

    $translateProvider
      .useStaticFilesLoader({
        prefix: 'assets/languages/',
        suffix: '.json'
      })
      .preferredLanguage('es')
      .useMissingTranslationHandler('CustomTranslateErrorHandlerFactory');

    $translateProvider.useSanitizeValueStrategy('sanitizeParameters');

  }]);

}(angular));