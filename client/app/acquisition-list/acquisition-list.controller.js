'use strict';
(function(){

class AcquisitionListComponent {
  constructor(API, Auth) {
    this.API = API;
    this.currentUser = Auth.getCurrentUser();
    this.requestList = [];
  }

  $onInit() {
    const setList = (list) => {
      this.requestList = list;
    }
    console.log(this.currentUser)
    this.API.doGet(
      'plants/' + this.currentUser.plant._id + '/sent-requests',
      setList,
      {
        status: 'approved'
      }
    );
  }
}

angular.module('spugApp')
  .component('acquisitionList', {
    templateUrl: 'app/acquisition-list/acquisition-list.html',
    controller: AcquisitionListComponent,
    controllerAs: 'acqList'
  });

})();
