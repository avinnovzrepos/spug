'use strict';

angular.module('spugApp.auth', [
  'spugApp.constants',
  'spugApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
