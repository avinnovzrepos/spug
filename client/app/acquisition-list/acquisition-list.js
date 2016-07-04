'use strict';

angular.module('spugApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('acquisition-list', {
        url: '/acquisition-list',
        parent: 'internal',
        authenticate: true,
        views: {
          'container@': {
            template: '<acquisition-list></acquisition-list>'
          }
        }
      });
  });
