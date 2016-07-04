'use strict';
(function(){

class HistoryListComponent {
  constructor(API) {
    this.API = API;
    this.historyList = [];
  }

  $onInit() {
    const setList = (historyList) => {
      this.historyList = historyList;
    }

    this.API.doGet('inventory-history', setList);
  }

}

angular.module('spugApp')
  .component('historyList', {
    templateUrl: 'app/history-list/history-list.html',
    controller: HistoryListComponent,
    controllerAs: 'history'
  });

})();
