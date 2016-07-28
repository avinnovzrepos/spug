'use strict';

angular.module('spugApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('plants-list', {
        url: '/plants-list',
        parent: 'internal',
        authenticate: true,
        views: {
          'container@': {
            template: '<plants-list></plants-list>'
          }
        }
      });
  });
