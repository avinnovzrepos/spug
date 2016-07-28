'use strict';
(function(){

class PlantsListComponent {
  constructor(API) {
    this.plantList = [];
    this.API = API;
  }

  $onInit() {
    const setPlants = (plants) => {
      this.plantList = plants;
    }

    this.API.doGet('plants', setPlants);
  }
}

angular.module('spugApp')
  .component('plantsList', {
    templateUrl: 'app/plants-list/plants-list.html',
    controller: PlantsListComponent,
    controllerAs: 'plants'
  });

})();
