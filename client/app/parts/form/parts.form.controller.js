'use strict';
(function(){

class PartsFormComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('spugApp')
  .component('partsForm', {
    templateUrl: 'app/parts/form/parts.form.html',
    controller: PartsFormComponent
  });

})();
