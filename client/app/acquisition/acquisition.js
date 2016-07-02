'use strict';

angular.module('spugApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('acquisition', {
        url: '/acquisition/:id',
        parent: 'internal',
        authenticate: true,
        views: {
          'container@': {
            template: '<acquisition></acquisition>'
          }
        }
      });
  });
