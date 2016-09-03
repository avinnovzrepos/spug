'use strict';

angular.module('spugApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('inventory', {
        url: '/inventory',
        parent: 'internal',
        views: {
          'container@': {
            template: '<inventory></inventory>'
          }
        },
        authenticate: true,
        breadcrumb: {
          title: 'Spare Parts Database',
          main: true
        }
      });
  });
