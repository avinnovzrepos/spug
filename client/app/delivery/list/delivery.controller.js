'use strict';
(function(){

class DeliveryComponent {
  constructor() {
    this.message = 'Hello';

    this.gridOptions = {
      enableColumnResizing: true,
      enableGridMenu: true,
      columnDefs: [
        { field: 'code', displayName: 'STOCK CODE' },
        { field: 'slo', displayName: 'SLO' },
        { field: 'name', displayName: 'DESCRIPTION' },
        { field: 'pin', displayName: 'PIN' },
        { field: 'pin', displayName: 'MPN' },
        { field: 'pin', displayName: 'UPN' },
        { field: 'pin', displayName: 'EQUIPMENT CATEGORY' },
        { field: 'unitOfMeasurement', displayName: 'MEASUREMENT' },
        { field: 'pin', displayName: 'BEGINNING INVENTORY' },
        { field: 'pin', displayName: 'DRAWING', cellTemplate: ' <div class="text-center clearfix"> <img src="http://placehold.it/30x30"> </div>' },
        { field: 'null', displayName: ' ',
          cellTemplate: '<div>'
          + '<button class="btn btn-small btn-warning">'
          + '<i class="glyphicon glyphicon-edit"></i>'
          + '</button>'
          + '<button class="btn btn-small btn-danger">'
          + '<i class="glyphicon glyphicon-trash"></i>'
          + '</button> </div>',
          enableColumnResizing: false,
          enableColumnMenu: false,
          enableFiltering: false,
          enableSorting: false
        },
      ]
    };
    
  }
}

angular.module('spugApp')
  .component('delivery', {
    templateUrl: 'app/delivery/list/delivery.html',
    controller: DeliveryComponent
  });

})();
