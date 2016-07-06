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
  'validation.match',
  'uiGmapgoogle-maps',
  'ngCsv'
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

  })

  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyBvZM-TE7mJHizUui47giQSEWcNwyzv45s',
      v: '3.23',
      libraries: 'weather,geometry,visualization'
    });
  });
