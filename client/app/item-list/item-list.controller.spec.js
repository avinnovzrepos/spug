'use strict';

describe('Component: ItemListComponent', function () {

  // load the controller's module
  beforeEach(module('spugApp'));

  var ItemListComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ItemListComponent = $componentController('ItemListComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
