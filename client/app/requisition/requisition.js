'use strict';

angular.module('spugApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('requisition', {
        url: '/requisition',
        parent: 'internal',
        authenticate: true,
        views: {
          'container@': {
            template: '<requisition></requisition>'
          }
        }
      });
  });
