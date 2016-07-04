'use strict';

describe('Component: RequisitionComponent', function () {

  // load the controller's module
  beforeEach(module('spugApp'));

  var RequisitionComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    RequisitionComponent = $componentController('RequisitionComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
