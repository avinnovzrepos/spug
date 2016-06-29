'use strict';

describe('Component: InventoryListComponent', function () {

  // load the controller's module
  beforeEach(module('spugApp'));

  var InventoryListComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    InventoryListComponent = $componentController('InventoryListComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
