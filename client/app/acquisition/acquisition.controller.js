'use strict';
(function(){

class AcquisitionComponent {
  constructor(Auth, API, $stateParams) {
    this.requests = [];
    this.API = API;
    this.currentUser = Auth.getCurrentUser();
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
    this.API.doPost('requests/' + this.$stateParams.id + '/receive', this.requests, function(resp) {
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
