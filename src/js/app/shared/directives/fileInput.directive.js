(function (ng) {

    "use strict";

    var Module = ng.module('Imm');

    Module.directive('fileModel', ['$parse' , '$http', '$rootScope', 'ngProgressFactory', function ($parse, $http, $rootScope, ngProgressFactory) {
      return {
        restrict: 'AE',
        scope: {
            filename: "=",
            fileurl: "="
        },
        link: function (scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;

          var ngProgress = ngProgressFactory.createInstance();

          element.bind('change', function () {

            scope.$apply(function () {
              ngProgress.start();

              scope.fileChanged = attrs.url;
              modelSetter(scope, element[0].files[0]);

              console.log(element[0].files[0]);

              var filename = element[0].files[0].name

              var fd = new FormData();
              fd.append('file', element[0].files[0]);

              $http.post(BASE_URL + "bucket", fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
              })
                .success(function (data) {
                  var url = data.url;

                  if (attrs.ngModel) {
                    console.log('evaluating');
                    console.log(attrs.ngModel + "= '" + url + "'");
                    scope.$eval(attrs.ngModel + "= '" + url + "'");
                  }else if (attrs.model) {
                    scope[attrs.model][attrs.property] = url;
                  }else {
                    scope[attrs.url] = url;
                  }

                  scope.filename = filename;
                  scope.fileurl = url;

                  ngProgress.complete();
                  ngProgress.reset();
                }).
                error(function (data, status, headers, config) {
                  ngProgress.complete();
                  ngProgress.reset();
                });
            });
          });
        }
      };
    }]);
}(angular));