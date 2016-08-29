'use strict';

describe('Component: PartsFormComponent', function () {

  // load the controller's module
  beforeEach(module('spugApp'));

  var PartsFormComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    PartsFormComponent = $componentController('PartsFormComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
