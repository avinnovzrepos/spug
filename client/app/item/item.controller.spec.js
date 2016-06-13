'use strict';

describe('Component: ItemComponent', function () {

  // load the controller's module
  beforeEach(module('spugApp'));

  var ItemComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ItemComponent = $componentController('ItemComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
