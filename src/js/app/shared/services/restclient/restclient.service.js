(function (ng) {

  'use strict';

  var Module = ng.module('Imm');

  Module.factory('RestClient', ['$http', '$state', 'ngProgressFactory', '$window', function ($http, $state, ngProgressFactory, $window) {

    var K = {},
      progressbar = ngProgressFactory.createInstance(),
      progressFlag = true,
      PRIMARY_COLOR = "#E60022",
      factory;

    function getConfig() {
      var config = {
        headers: {
          'Authorization': 'Bearer ' + $window.sessionStorage[TOKEN_KEY]
        }
      };
      return config;
    };

    progressbar.setHeight('2px');
    progressbar.setColor(PRIMARY_COLOR);

    factory = {

      get: function (url, callback, options) {

        //if (progressFlag) {
          //progressbar.start();
        //}

        var progressFlag = (options && options.disableProgressFlag);
        if (!progressFlag) {
          progressbar.start();
        }

        $http.get(BASE_URL + url, getConfig()).
        success(function(data, status, headers, config) {
          if (!progressFlag) { 
            progressbar.complete(); 
          }
          callback(null, data, headers);
        }).
        error(function(data, status, headers, config) {
          if (!progressFlag) {
            progressbar.complete();
          }
          if (status == 401 && $state.current.name != "login" && $state.current.name!= "recovery") { //Go to login
            $state.go('login');
          } else {
            callback(data);
          }
        });
      },

      getWithoutCheck: function (url, callback, options) {

        var progressFlag = (options && options.disableProgressFlag);
        if (!progressFlag) {
          progressbar.start();
        }

        $http.get(BASE_URL + url, getConfig()).
        success(function(data, status, headers, config) {
          if (!progressFlag) { 
            progressbar.complete(); 
          }
          callback(null, data, headers);
        }).
        error(function(data, status, headers, config) {
          if (!progressFlag) {
            progressbar.complete();
          }
          callback(data);
          
        });
      },

      downloadFile: function(url, callback) {
        url = BASE_URL + url;
        url = url + "?access_token="+$window.sessionStorage[TOKEN_KEY];
        window.open(url, 'Download');
      },

      post: function (url, data, callback) {

        if (progressFlag) {
          progressbar.start();
        }

        $http.post(BASE_URL + url, data, getConfig()).then(function successCallback(response) {
          if (progressFlag) {
            progressbar.complete();
          }
          callback(null, response.data);
        }, function errorCallback(response) {
          progressbar.complete();
          if (status == 401 && $state.current.name != "login" && $state.current.name != "recovery") { //Go to login
            $state.go('login');
          } else {
            callback(response);
          }
        });
      },

      postFormData: function(url, data, callback) {
        progressbar.start();

        var fd = new FormData();

        _.mapObject(data, function(value, key) {
            fd.append(key, value);
        });

        console.log("Headers:", _.extend(getConfig().headers, {
            'Content-Type': undefined
        }));

        var conf = getConfig();
        conf.headers['Content-Type'] = undefined;
        console.log("Conf Headers:", conf);

        $http({
            headers: conf.headers,
            method: 'POST',
            url: BASE_URL + url,
            transformRequest: angular.identity,
            data: fd,
        }).
        success(function(data, status, headers, config) {
            progressbar.complete();
            callback(null, data);
        }).
        error(function(data, status, headers, config) {
            progressbar.complete();
            callback(data, null);
        });
      },

      put: function (url, data, callback) {

        if (progressFlag) {
          progressbar.start();
        }

        $http.put(BASE_URL + url, data, getConfig()).then(function successCallback(response) {
          if (progressFlag) {
            progressbar.complete();
          }
          callback(null, response.data);
        }, function errorCallback(response) {
          if (progressFlag) {
            progressbar.complete();
          }
          if (status == 401 && $state.current.name != "login" && $state.current.name != "recovery") { //Go to login
            $state.go('login');
          } else {
            callback(response);
          }
        });
      },

      delete: function (url, callback) {

        if (progressFlag) {
          progressbar.start();
        }

        $http.delete(BASE_URL + url, getConfig()).then(function successCallback(response) {
          if (progressFlag) {
            progressbar.complete();
          }
          callback(null, response.data);
        }, function errorCallback(response) {
          progressbar.complete();
          if (status == 401 && $state.current.name != "login" && $state.current.name != "recovery") { //Go to login
            $state.go('login');
          } else {
            callback(response);
          }
        });
      }
    }

    return factory;

  }]);

}(angular));