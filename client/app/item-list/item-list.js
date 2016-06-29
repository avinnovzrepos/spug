'use strict';

angular.module('spugApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('item-list', {
        url: '/item-list',
        parent: 'internal',
        authenticate: true,
        views: {
          'container@': {
            template: '<item-list></item-list>'
          }
        }
      });
  });
