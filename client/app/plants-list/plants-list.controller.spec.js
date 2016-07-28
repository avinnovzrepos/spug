'use strict';

describe('Component: PlantsListComponent', function () {

  // load the controller's module
  beforeEach(module('spugApp'));

  var PlantsListComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    PlantsListComponent = $componentController('PlantsListComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
