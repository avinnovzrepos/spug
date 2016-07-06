'use strict';

describe('Component: RequisitionListComponent', function () {

  // load the controller's module
  beforeEach(module('spugApp'));

  var RequisitionListComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    RequisitionListComponent = $componentController('RequisitionListComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
