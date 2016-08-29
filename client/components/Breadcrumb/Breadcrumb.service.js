'use strict';

angular.module('spugApp')
  .factory('Breadcrumb', function () {
    var breadCrumb = [];
    return {
      get: function () {
        return breadCrumb;
      },
      set: function(data) {
        if(data.breadcrumb.main) {
          breadCrumb = [];
        }
        breadCrumb.push(data)
      }
    };
  });
