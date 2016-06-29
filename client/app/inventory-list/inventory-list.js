'use strict';

angular.module('spugApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('inventory-list', {
        url: '/inventory-list',
        parent: 'internal',
        authenticate: true,
        views: {
          'container@': {
            template: '<inventory-list></inventory-list>'
          }
        }
      });
  });
