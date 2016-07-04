'use strict';
(function(){

class RequisitionComponent {
  constructor(API) {
    this.API = API;
    this.items = [];
    this.form = {};
    this.formItemCount = 1;
    this.request = {};
    this.request.items = [];
  }

  $onInit() {
    const setItems = (items) => {
      console.log(items);
      this.items = items;
    };

    this.API.doGet('items', setItems);
  }

  addInput() {
    console.log("edi wow");
    this.formItemCount++;
  }

  delInput(index) {
    this.formItemCount--;
  }

  getNumber(num) {
    return new Array(num);
  }

  submit(form) {
    form.requestType = "purchasing-to-plant",
    form.items = angular.extend([], form.items);
    this.API.doPost('requests', form, function(resp) {
      console.log(resp);
    },{});
  }


}

angular.module('spugApp')
  .component('requisition', {
    templateUrl: 'app/requisition/requisition.html',
    controller: RequisitionComponent,
    controllerAs: 'requi'
  });

})();
