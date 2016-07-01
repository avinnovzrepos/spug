'use strict';
(function(){

class InventoryListComponent {
  constructor(API) {
    this.API = API;
    this.inventoryList = [];
  }

  $onInit() {
    const setList = (inventoryList) => {
      this.inventoryList = inventoryList;
    }

    this.API.doGet('inventory', setList);
  }

  delete(stock) {
    const deleteStock = (resp) => {
      this.inventoryList.map((data, index) => {
        if(stock._id == data._id) {
          this.inventoryList.splice(index, 1);
        }
      });
    };
    this.API.doDelete('inventory', stock._id, deleteStock);
  }
}

angular.module('spugApp')
  .component('inventoryList', {
    templateUrl: 'app/inventory-list/inventory-list.html',
    controller: InventoryListComponent,
    controllerAs: 'itemInventory'
  });

})();
