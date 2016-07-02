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

}

angular.module('spugApp')
  .component('acquisition', {
    templateUrl: 'app/acquisition/acquisition.html',
    controller: AcquisitionComponent,
    controllerAs: 'acq'
  });

})();
