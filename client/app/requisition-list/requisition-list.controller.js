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

    this.API.doGet('plants/'+this.currUser.plant._id+"/requests", (otherRequests) => {
      this.otherRequestList = otherRequests;
    });

    let apiUri = 'plants/'+this.currUser.plant._id;

    if(this.currUser.role == 'admin') {
      apiUri = apiUri+"/purchase-orders";
    } else {
      apiUri = apiUri+"/sent-requests";
    }

    this.API.doGet(apiUri, setList, {
      status: 'pending'
    });

  }

  approve(request) {
    this.API.doPost('requests/'+request._id+"/approve", {}, (resp) => {
      request.status = resp.status;
    });
  }

  decline(request) {
    //TODO
  }

  cancel(request) {
    console.log('cancel');
    this.API.doDelete('requests', request._id, (resp) => {
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
