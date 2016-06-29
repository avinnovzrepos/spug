'use strict';

angular.module('spugApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        parent: 'internal',
        authenticate: true,
        views: {
          'container@': {
            template: '<main></main>'
          }
        }
      });
  });
