'use strict';

angular.module('spugApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('item', {
        url: '/item/:itemType?:id',
        parent: 'internal',
        authenticate: true,
        views: {
          'container@': {
            template: '<item></item>'
          }
        }
      });
  });
