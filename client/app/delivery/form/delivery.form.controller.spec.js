'use strict';

describe('Component: DeliveryFormComponent', function () {

  // load the controller's module
  beforeEach(module('spugApp'));

  var DeliveryFormComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    DeliveryFormComponent = $componentController('DeliveryFormComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
