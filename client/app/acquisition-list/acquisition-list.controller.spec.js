'use strict';

describe('Component: AcquisitionListComponent', function () {

  // load the controller's module
  beforeEach(module('spugApp'));

  var AcquisitionListComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    AcquisitionListComponent = $componentController('AcquisitionListComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
