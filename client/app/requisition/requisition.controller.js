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
      this.items = items || [];
    };

    this.API.doGet('items', setItems);

    if(this.currUser.role !== 'admin') {
      const setPlants = (plants) => {
        console.log("plants");
        this.plants = plants || [];
      };

      this.API.doGet('plants', setPlants, { exclude: this.currUser.plant._id });
    }


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
    let temp = [];
    form.source = this.$stateParams.plantId || form.source;
    for(let i of form.items) {
      i && temp.push(i)
    }
    form.items = temp;
    form.items = angular.extend([], form.items);
    if(this.currUser.role !== 'admin') {
      this.API.doPost('requests', form, function(resp) {
        state.go('requisition-list');
      },{});
    } else {
      this.API.doPost('purchase-orders', form, function(resp) {
        state.go('requisition-list');
      },{});
    }
  }


}

angular.module('spugApp')
  .component('requisition', {
    templateUrl: 'app/requisition/requisition.html',
    controller: RequisitionComponent,
    controllerAs: 'requi'
  });

})();
