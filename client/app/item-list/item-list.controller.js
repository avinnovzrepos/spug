'use strict';
(function(){

class ItemListComponent {
  constructor(API) {
    this.API = API;
    this.items = [];
  }

  $onInit() {
    const setItems = (items) => {
      this.items = items;
    }

    this.API.doGet('items', setItems);
  }

  delete(item) {
    const deleteItem = (resp) => {
      this.items.map((data, index) => {
        if(item._id == data._id) {
          this.items.splice(index, 1);
        }
      });
    };

    this.API.doDelete('items', item._id, deleteItem);
  }
}

angular.module('spugApp')
  .component('itemList', {
    templateUrl: 'app/item-list/item-list.html',
    controller: ItemListComponent,
    controllerAs: 'itemList'
  });

})();
