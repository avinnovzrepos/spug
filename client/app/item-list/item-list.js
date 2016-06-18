'use strict';

angular.module('spugApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('item-list', {
        url: '/item-list',
        template: '<item-list></item-list>'
      });
  });
