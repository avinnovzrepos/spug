'use strict';
(function(){

class PlantsComponent {
  constructor($state, API) {
    this.API = API;
    this.$state = $state;
  }

  submit(plant) {
    plant.location.coordinates = angular.extend([], plant.location.coordinates);
    let state = this.$state;
    this.API.doPost('plants', plant, function(resp) {
      state.go('plants-list');
    },{});
  }
}

angular.module('spugApp')
  .component('plants', {
    templateUrl: 'app/plants/plants.html',
    controller: PlantsComponent,
    controllerAs: 'plant'
  });

})();
