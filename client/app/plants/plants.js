'use strict';

angular.module('spugApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('plants', {
        url: '/plants',
        parent: 'internal',
        authenticate: true,
        views: {
          'container@': {
            template: '<plants></plants>'
          }
        }
      });
  });
