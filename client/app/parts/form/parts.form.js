'use strict';

angular.module('spugApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('parts.form', {
        url: '/parts/form',
        parent: 'internal',
        views: {
          'container@': {
            template: '<parts-form></parts-form>'
          }
        },
        authenticate: true,
        breadcrumb: {
          title: 'Spare Parts Database',
          main: true
        }
      });
  });
