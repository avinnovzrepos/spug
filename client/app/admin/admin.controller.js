'use strict';

(function() {

class AdminController {
  constructor(User) {
    // Use the User $resource to fetch all users
    // User.query({}, function(data) {
    //   console.log(data.$promise.$$state);
    // });
    // testUser = [{name: "Moroni", age: 50}];

    this.gridOptions = {
      enableColumnResizing: true,
      enableGridMenu: true,
      columnDefs: [
        { field: 'name', displayName: 'NAME' },
        { field: 'email', displayName: 'EMAIL' },
        { field: 'position', displayName: 'POSITION' },
        { field: 'department', displayName: 'DEPARTMENT' },
        { field: 'division', displayName: 'DIVISION' },
        { field: 'plant.name', displayName: 'PLANT' },
        { field: 'role', displayName: 'ACCESS LEVEL' },
        { field: 'null', displayName: ' ',
          cellTemplate: '<div>'
          + '<button class="btn btn-small btn-warning">'
          + '<i class="glyphicon glyphicon-edit"></i>'
          + '</button>'
          + '<button class="btn btn-small btn-danger">'
          + '<i class="glyphicon glyphicon-trash"></i>'
          + '</button> </div>',
          enableColumnResizing: false,
          enableColumnMenu: false,
          enableFiltering: false,
          enableSorting: false
        },
      ]
    };

   this.gridOptions.data = User.query();

    // this.NgTableParams = NgTableParams;
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
}

angular.module('spugApp.admin')
  .controller('AdminController', AdminController);

})();
