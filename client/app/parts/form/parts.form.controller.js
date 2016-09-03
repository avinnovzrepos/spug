'use strict';
(function(){

class PartsFormComponent {
  constructor(API) {
    this.message = 'Hello';
    this.itemType = true;

    API.doGet('measurement-units', (uoms) => {
    	this.uoms = uoms;
    });

    API.doGet('storage-levels', (storageLevels) => {
    	this.storageLevels = storageLevels;
    });

    API.doGet('classifications', (classifications) => {
    	this.classifications = classifications;
    });

    API.doGet('usage-frequency', (usageFrequencies) => {
    	this.usageFrequencies = usageFrequencies;
    });

    API.doGet('maintenance-requirements', (maintananceRequirements) => {
    	this.maintananceRequirements = maintananceRequirements;
    });

  }
}

angular.module('spugApp')
  .component('partsForm', {
    templateUrl: 'app/parts/form/parts.form.html',
    controller: PartsFormComponent,
    controllerAs: 'partsCtrl'
  });

})();
