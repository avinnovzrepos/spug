'use strict';
(function(){

class ItemListComponent {
  constructor(API) {
    this.message = 'Hello';
    this.API = API;
    this.items = [];
  }

  $onInit() {
    const setItems = (items) => {
      this.items = items;
    }

    this.API.doGet('items', setItems);
  }
}

angular.module('spugApp')
  .component('itemList', {
    templateUrl: 'app/item-list/item-list.html',
    controller: ItemListComponent,
    controllerAs: 'itemList'
  });

})();
