'use strict';

angular.module('spugApp', [
  'spugApp.auth',
  'spugApp.admin',
  'spugApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider, $stateProvider) {
    $urlRouterProvider
      .otherwise('/login');

    $stateProvider
      .state('internal', {
        abstract: true,
        views: {
          'header': {
            template: '<navbar></navbar>'
          }
        }
      })

    $locationProvider.html5Mode(true);

  });
