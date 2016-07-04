'use strict';
(function(){

class AcquisitionListComponent {
  constructor(API) {
    this.API = API;
    this.requestList = [];
  }

  $onInit() {
    const setList = (list) => {
      this.requestList = list;
    }

    this.API.doGet('requests', setList);
  }
}

angular.module('spugApp')
  .component('acquisitionList', {
    templateUrl: 'app/acquisition-list/acquisition-list.html',
    controller: AcquisitionListComponent,
    controllerAs: 'acqList'
  });

})();
