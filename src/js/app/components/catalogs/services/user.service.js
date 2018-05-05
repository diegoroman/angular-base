(function (ng) {

    'use strict';

    var Module = ng.module('Imm');

    Module.factory('UserServices', ['RestClient', function(RestClient){
	  
	  var model = "users";
	  
	  var factory = {

	  	findAll: function(page, q,  cb) {
			RestClient.get(model + "?sort[name]=1" + q, function(err, result) {
				  cb(err, result);
			  })
		},

	    find: function(page, q,  cb) {
	      RestClient.get(model + "/grid?sort[name]=1&offset="+page+"&limit=" + PAGE_SIZE + "&" + q, function(err, result, countItems) {
	        cb(err, result, countItems);
	      })
	    },

	    findById: function(id, cb) {
	      RestClient.get(model + "/grid/" + id, function(err, result) {
	        cb(err, result);
	      })
	    },

	    save: function(obj, cb) {
	    	console.log('obj save', obj);
	      if (obj.idUser) {
	        RestClient.put(model + "/" + obj.idUser, obj, function(err, result) {
	          cb(err, result);
	        })
	      }else{
	        RestClient.post(model, obj,function(err, result) {
	          cb(err, result);
	        })
	      }
	    },

	    remove: function(id, cb) {
	      RestClient.delete(model + "/" + id, function(err, result) {
	        cb(err, result);
	      })
	    },
	  };

	  return factory;

	}]);

}(angular));