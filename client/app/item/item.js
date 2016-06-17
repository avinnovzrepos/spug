'use strict';

angular.module('spugApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('item', {
        url: '/item/:itemType',
        template: '<item></item>'
      });
  });
