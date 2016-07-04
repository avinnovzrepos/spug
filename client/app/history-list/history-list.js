'use strict';

angular.module('spugApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('history-list', {
        url: '/history',
        parent: 'internal',
        authenticate: true,
        views: {
          'container@': {
            template: '<history-list></history-list>'
          }
        }
      });
  });
