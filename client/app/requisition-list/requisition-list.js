'use strict';

angular.module('spugApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('requisition-list', {
        url: '/requisition-list',
        parent: 'internal',
        authenticate: true,
        views: {
          'container@': {
            template: '<requisition-list></requisition-list>'
          }
        }
      });
  });
