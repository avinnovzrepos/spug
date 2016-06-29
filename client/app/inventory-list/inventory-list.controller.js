'use strict';
(function(){

class InventoryListComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('spugApp')
  .component('inventoryList', {
    templateUrl: 'app/inventory-list/inventory-list.html',
    controller: InventoryListComponent,
    controllerAs: 'itemInventory'
  });

})();
