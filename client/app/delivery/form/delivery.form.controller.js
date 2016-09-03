'use strict';
(function(){

class DeliveryFormComponent {
  constructor() {
    this.message = 'Hello';
    console.log('sunday morning');
  }
}

angular.module('spugApp')
  .component('deliveryForm', {
    templateUrl: 'app/delivery/form/delivery.form.html',
    controller: DeliveryFormComponent
  });

})();
