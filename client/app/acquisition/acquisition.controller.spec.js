'use strict';

describe('Component: AcquisitionComponent', function () {

  // load the controller's module
  beforeEach(module('spugApp'));

  var AcquisitionComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    AcquisitionComponent = $componentController('AcquisitionComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
