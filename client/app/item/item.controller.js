'use strict';
(function(){

class ItemComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('spugApp')
  .component('item', {
    templateUrl: 'app/item/item.html',
    controller: ItemComponent
  });

})();
