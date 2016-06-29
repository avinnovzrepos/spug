'use strict';

angular.module('spugApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('inventory', {
        url: '/inventory',
        parent: 'internal',
        authenticate: true,
        views: {
          'container@': {
            template: '<inventory></inventory>'
          }
        }
      });
  });
