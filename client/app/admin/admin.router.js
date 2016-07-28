'use strict';

angular.module('spugApp.admin')
  .config(function($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        parent: 'internal',
        views: {
          'container@': {
            templateUrl: 'app/admin/admin.html',
            controller: 'AdminController',
            controllerAs: 'admin'
          }
        },
        authenticate: 'admin'

      });
  });
