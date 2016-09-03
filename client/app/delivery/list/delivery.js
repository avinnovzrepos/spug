'use strict';

angular.module('spugApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('delivery', {
        url: '/delivery',
        parent: 'internal',
        views: {
          'container@': {
            template: '<delivery></delivery>'
          }
        },
        authenticate: true,
        breadcrumb: {
          title: 'Spare Parts Database',
          main: true
        }
      });
  });
