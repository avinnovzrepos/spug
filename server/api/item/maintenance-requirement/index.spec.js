'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var maintenanceRequirementCtrlStub = {
  index: 'maintenanceRequirementCtrl.index',
  show: 'maintenanceRequirementCtrl.show',
  create: 'maintenanceRequirementCtrl.create',
  update: 'maintenanceRequirementCtrl.update',
  destroy: 'maintenanceRequirementCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var maintenanceRequirementIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './maintenance-requirement.controller': maintenanceRequirementCtrlStub
});

describe('MaintenanceRequirement API Router:', function() {

  it('should return an express router instance', function() {
    maintenanceRequirementIndex.should.equal(routerStub);
  });

  describe('GET /api/maintenance-requirements', function() {

    it('should route to maintenanceRequirement.controller.index', function() {
      routerStub.get
        .withArgs('/', 'maintenanceRequirementCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/maintenance-requirements/:id', function() {

    it('should route to maintenanceRequirement.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'maintenanceRequirementCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/maintenance-requirements', function() {

    it('should route to maintenanceRequirement.controller.create', function() {
      routerStub.post
        .withArgs('/', 'maintenanceRequirementCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/maintenance-requirements/:id', function() {

    it('should route to maintenanceRequirement.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'maintenanceRequirementCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/maintenance-requirements/:id', function() {

    it('should route to maintenanceRequirement.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'maintenanceRequirementCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/maintenance-requirements/:id', function() {

    it('should route to maintenanceRequirement.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'maintenanceRequirementCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
