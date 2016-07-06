'use strict';
(function(){

class RequisitionListComponent {
  constructor(API, Auth) {
    this.API = API;
    this.myRequestList = [];
    this.otherRequestList = [];
    this.currUser = Auth.getCurrentUser();
  }

  $onInit() {
    const setList = (list) => {
      this.requestList = list;
    }

    this.API.doGet('plants/'+this.currUser.plant._id+"/sent-requests", setList, {
      status: 'pending'
    });
    this.API.doGet('plants/'+this.currUser.plant._id+"/requests", (otherRequests) => {
      this.otherRequestList = otherRequests;
    });
  }

  approve(request) {
    this.API.doPost('requests/'+request._id+"/approve", {}, (resp) => {
      console.log(resp);
    });
  }
}

angular.module('spugApp')
  .component('requisitionList', {
    templateUrl: 'app/requisition-list/requisition-list.html',
    controller: RequisitionListComponent,
    controllerAs: 'requeList'
  });

})();
