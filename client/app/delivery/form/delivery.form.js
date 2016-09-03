'use strict';

angular.module('spugApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('delivery.form', {
        url: '/delivery/form',
        parent: 'internal',
        views: {
          'container@': {
            template: '<delivery-form></delivery-form>'
          }
        },
        authenticate: true,
        breadcrumb: {
          title: 'Spare Parts Database',
          main: true
        }
      });
  });
