'use strict';
(function(){

class InventoryComponent {
  constructor($state, $stateParams, API, Auth) {
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.API = API;
    this.items = [];
    this.form = {};
    this.user = Auth.getCurrentUser();
  }

  $onInit() {
    const setItems = (items) => {
      this.items = items;
    };

    const setForm = (data) => {
      this.form = data;
    }

    if(this.$stateParams.id) {
      this.API.doGet('inventory/' + this.$stateParams.id, setForm);
    }

    this.API.doGet('items', setItems);
  }

  submit(stock) {
    let state = this.$state;
    stock.item = stock.item._id;
    stock.plant = this.user.plant;
    if(this.$stateParams.id) {
      this.API.doPut('inventory', stock, function(resp) {
        state.go('inventory-list');
      },{}, this.$stateParams.id);
    } else {
      this.API.doPost('inventory', stock, function(resp) {
        state.go('inventory-list');
      },{});
    }

  }
}

angular.module('spugApp')
  .component('inventory', {
    templateUrl: 'app/inventory/inventory.html',
    controller: InventoryComponent,
    controllerAs: 'invForm'
  });

})();
