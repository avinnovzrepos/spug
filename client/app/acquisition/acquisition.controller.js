'use strict';
(function(){

class AcquisitionComponent {
  constructor(API, $stateParams) {
    this.requests = [];
    this.API = API;
    this.$stateParams = $stateParams;
  }

  $onInit() {
    const setForm = (data) => {
      this.requests = data;
    }
    if(this.$stateParams.id) {
      this.API.doGet('requests/' + this.$stateParams.id, setForm);
    }
  }

  submit(form) {
    this.API.doPost('receiving/' + this.requests._id, this.requests, function(resp) {
      console.log(resp);
    },{});
  }

}

angular.module('spugApp')
  .component('acquisition', {
    templateUrl: 'app/acquisition/acquisition.html',
    controller: AcquisitionComponent,
    controllerAs: 'acq'
  });

})();
