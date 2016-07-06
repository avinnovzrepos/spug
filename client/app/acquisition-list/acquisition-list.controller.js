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

    let apiUri = 'plants/' + this.currentUser.plant._id;
    let params = {};
    if(this.currentUser.role == 'admin') {
      apiUri = apiUri+"/purchase-orders";
    } else {
      apiUri = apiUri+"/sent-requests";
      params.status = 'approved';
    }

    this.API.doGet(apiUri, setList, params);
  }
}

angular.module('spugApp')
  .component('acquisitionList', {
    templateUrl: 'app/acquisition-list/acquisition-list.html',
    controller: AcquisitionListComponent,
    controllerAs: 'acqList'
  });

})();
