(function (ng) {

  'use strict';

  var Module = ng.module('Imm');

  Module.factory('AdminServices', ['RestClient', function (RestClient) {

    var factory = {

      getItem: function (model, id, cb) {
        RestClient.get(model + "/" + id, function (err, result) {
          cb(err, result);
        });
      },

      getItems: function (model, q, page, cb) {
        RestClient.get(model + '?limit=' + PAGE_SIZE + '&offset=' + page + q, function (err, result, headers) {
          cb(err, result, headers);
        });
      },

      getAllItems: function (model, cb) {
        RestClient.get(model, function (err, result) {
          cb(err, result);
        });
      },

      save: function (model, obj, cb) {
        if (obj.id) {
          RestClient.put(model + '/' + obj.id, obj, function (err, result) {
            cb(err, result);
          });
        } else {
          RestClient.post(model, obj, function (err, result) {
            cb(err, result);
          });
        }
      },

      delete: function (model, id, cb) {
        RestClient.delete(model + "/" + id, function (err, result) {
          cb(err, result);
        });
      }
    };

    return factory;

  }]);

}(angular));