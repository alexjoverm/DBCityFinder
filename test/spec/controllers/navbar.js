'use strict';

describe('Controller: NavbarctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('mmtFinalExamApp'));

  var NavbarctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NavbarctrlCtrl = $controller('NavbarctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
