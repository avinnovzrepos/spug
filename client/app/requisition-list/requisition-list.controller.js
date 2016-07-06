'use strict';
(function(){

class RequisitionListComponent {
  constructor(API, Auth) {
    this.API = API;
    this.requestList = [];
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

  approve(request, status) {
    this.API.doPost('requests/'+request._id+status, {}, (resp) => {
      request.status = resp.status;
    });
  }

  cancel(request, $index) {
    const removeFromList = (resp) => {
      this.requestList.splice($index, 1);
    }
    this.API.doDelete('requests', request._id, removeFromList);
  }

  getCSV(requestItems) {
    console.log("REQUEST ITEMS")
    return requestItems.map((requestItem) => ({
      itemCode: requestItem.item.code,
      itemName: requestItem.item.name,
      quantity: requestItem.quantity
    }))
  }
}

angular.module('spugApp')
  .component('requisitionList', {
    templateUrl: 'app/requisition-list/requisition-list.html',
    controller: RequisitionListComponent,
    controllerAs: 'requeList'
  });

})();
