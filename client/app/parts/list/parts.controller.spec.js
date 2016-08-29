'use strict';

describe('Component: PartsComponent', function () {

  // load the controller's module
  beforeEach(module('spugApp'));

  var PartsComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    PartsComponent = $componentController('PartsComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
