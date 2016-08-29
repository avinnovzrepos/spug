'use strict';

angular.module('spugApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('parts', {
        url: '/parts',
        parent: 'internal',
        views: {
          'container@': {
            template: '<parts></parts>'
          }
        },
        authenticate: true,
        breadcrumb: {
          title: 'Spare Parts Database',
          main: true
        }
      });
  });
