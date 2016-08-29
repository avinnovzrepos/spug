'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth, $cookieStore, $scope, $rootScope, $state, Breadcrumb) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    this.Auth = Auth;
    this.$cookieStore = $cookieStore;
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.mobileView = 992;
    this.$rootScope.toggle = true;
    this.$state = $state;
    this.Breadcrumb = Breadcrumb;
  }

  logout() {
    this.Auth.logout();
    this.$state.go('login');
  }

  /**
    Sidebar Toggle & Cookie Control
  **/
  toggleSidebar = function() {
    this.$rootScope.toggle = !this.$rootScope.toggle;
    this.$cookieStore.put('toggle', this.$rootScope.toggle);
  };

}

angular.module('spugApp')
  .controller('NavbarController', NavbarController);
