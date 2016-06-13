'use strict';

angular.module('spugApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('item', {
        url: '/item',
        template: '<item></item>'
      });
  });
