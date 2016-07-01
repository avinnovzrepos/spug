'use strict';

describe('Component: HistoryListComponent', function () {

  // load the controller's module
  beforeEach(module('spugApp'));

  var HistoryListComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    HistoryListComponent = $componentController('HistoryListComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
