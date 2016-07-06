'use strict';
(function(){

class RequisitionComponent {
  constructor($stateParams, $state, API, Auth) {
    this.API = API;
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.items = [];
    this.form = {};
    this.form.items = [null];
    this.plants = [];
    this.plantInventory = [];
    this.currUser = Auth.getCurrentUser();
  }

  $onInit() {
    const setItems = (items) => {
      this.items = items;
    };

    const setPlants = (plants) => {
      this.plants = plants;
    };

    this.API.doGet('items', setItems);
    this.API.doGet('plants', setPlants, { exclude: this.currUser.plant._id });

    if(this.$stateParams.plantId) {
      const setInventory = (inventory) => {
        this.form.source = inventory[0].plant._id;
        this.plantInventory = inventory;
      };

      this.API.doGet('plants/'+this.$stateParams.plantId+"/inventory", setInventory);
    }
  }

  addInput() {
    this.form.items.push(null);
  }

  delInput(index) {
    this.form.items.splice(index, 1);
    console.log(this.form.items);
  }

  requestItem(item) {
    let formLength = this.form.items.length;
    this.form.items[formLength] = {};
    this.form.items[formLength].item = item;
    this.form.items[formLength].quantity = 1;
  }

  submit(form) {
    let state = this.$state;
    form.source = this.$stateParams.plantId || form.source;
    form.items = angular.extend([], form.items);
    this.API.doPost('requests', form, function(resp) {
      state.go('requisition-list');
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
