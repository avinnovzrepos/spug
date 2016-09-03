'use strict';

describe('Component: DeliveryComponent', function () {

  // load the controller's module
  beforeEach(module('spugApp'));

  var DeliveryComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    DeliveryComponent = $componentController('DeliveryComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
