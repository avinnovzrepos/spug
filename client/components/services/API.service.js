'use strict';

angular.module('spugApp.auth')
  .factory('API', function ($http) {
    var url = "/api/";
    var defaultErrorMessage = "Server responded with an undefined error!";
    return {
      apiURL: function() {
        return url;
      },
      doGet: function(uri, callback, params) {
        console.log(params);
        $http({
          url: url + uri,
          method: 'GET',
          params: params ? params : {}
        }).success(function(data) {
          if(callback) return callback(data);
          return data;
        }).error(function(error) {
          if(callback) return callback(undefined, error || defaultErrorMessage);
          return error || defaultErrorMessage;
        });
      },
      doPost: function(uri, object, callback, params) {
        $http({
          url: url + uri,
          method: 'POST',
          data: object,
          params: params ? params : {},
          headers: {'Content-Type': 'application/json'}
        }).success(function(data) {
          if(callback) return callback(data);
          return data;
        }).error(function(error) {
          if(callback) return callback(undefined, error || defaultErrorMessage);
          return error || defaultErrorMessage;
        });
      },
      doPut: function(uri, object, callback, params, id) {
        $http({
          url: url + uri + '/' + id,
          method: 'PUT',
          data: object,
          params: params ? params : {},
          headers: {'Content-Type': 'application/json'}
        }).success(function(data) {
          if(callback) return callback(data);
          return data;
        }).error(function(error) {
          if(callback) return callback(undefined, error || defaultErrorMessage);
          return error || defaultErrorMessage;
        });
      },
      doDelete: function(uri, id, callback, params) {
        $http({
          url: url + uri + "/" + id,
          params: params ? params : {},
          method: 'DELETE'
        }).success(function(data) {
          if(callback) return callback(data);
          return data;
        }).error(function(error) {
          if(callback) return callback(undefined, error || defaultErrorMessage);
          return error || defaultErrorMessage;
        });
      }
    }
  });
