'use strict';

angular.module('spugApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        views: {
          'container@': {
            templateUrl: 'app/account/login/login.html',
            controller: 'LoginController',
            controllerAs: 'vm'
          }
        },
        authenticate: false
      })
      .state('logout', {
        url: '/logout?referrer',
        referrer: 'main',
        template: '',
        controller: function($state, Auth) {
          var referrer = $state.params.referrer ||
                          $state.current.referrer ||
                          'main';
          Auth.logout();
          $state.go(referrer);
        }
      })
      .state('signup', {
        url: '/signup',
        parent: 'internal',
        views: {
          'container@': {
            templateUrl: 'app/account/signup/signup.html',
            controller: 'SignupController',
            controllerAs: 'vm'
          }
        },
        authenticate: true
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsController',
        controllerAs: 'vm',
        authenticate: true
      });
  })
  .run(function($rootScope) {
    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {

      if (next.name === 'logout' && current && current.name && !current.authenticate) {
        next.referrer = current.name;
      }

      if(next.parent) {
        $rootScope.layoutBg = true;
      } else {
        $rootScope.layoutBg = false;
      }
    });
  });
