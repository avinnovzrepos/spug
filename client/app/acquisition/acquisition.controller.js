'use strict';
(function(){

class AcquisitionComponent {
  constructor($stateParams, $state, Auth, API) {
    this.requests = [];
    this.API = API;
    this.currentUser = Auth.getCurrentUser();
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.apiUri = this.currentUser.role === 'admin' ? 'purchase-orders/' : 'requests/';
  }

  $onInit() {
    const setForm = (data) => {
      this.requests = data;
    }


    if(this.$stateParams.id) {
      this.API.doGet(this.apiUri + this.$stateParams.id, setForm);
    }
  }

  submit(form) {
    let state = this.$state;
    this.API.doPost(this.apiUri + this.$stateParams.id + '/receive', this.requests, function(resp) {
      alert('Success! Item Acquired');
      state.go('acquisition-list');
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
