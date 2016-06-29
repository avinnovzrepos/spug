'use strict';
(function(){

class InventoryComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('spugApp')
  .component('inventory', {
    templateUrl: 'app/inventory/inventory.html',
    controller: InventoryComponent
  });

})();
