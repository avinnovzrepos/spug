'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var measurementUnitCtrlStub = {
  index: 'measurementUnitCtrl.index',
  show: 'measurementUnitCtrl.show',
  create: 'measurementUnitCtrl.create',
  update: 'measurementUnitCtrl.update',
  destroy: 'measurementUnitCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var measurementUnitIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './measurement-unit.controller': measurementUnitCtrlStub
});

describe('MeasurementUnit API Router:', function() {

  it('should return an express router instance', function() {
    measurementUnitIndex.should.equal(routerStub);
  });

  describe('GET /api/measurement-units', function() {

    it('should route to measurementUnit.controller.index', function() {
      routerStub.get
        .withArgs('/', 'measurementUnitCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/measurement-units/:id', function() {

    it('should route to measurementUnit.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'measurementUnitCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/measurement-units', function() {

    it('should route to measurementUnit.controller.create', function() {
      routerStub.post
        .withArgs('/', 'measurementUnitCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/measurement-units/:id', function() {

    it('should route to measurementUnit.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'measurementUnitCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/measurement-units/:id', function() {

    it('should route to measurementUnit.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'measurementUnitCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/measurement-units/:id', function() {

    it('should route to measurementUnit.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'measurementUnitCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
