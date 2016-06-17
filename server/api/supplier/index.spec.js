'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var supplierCtrlStub = {
  index: 'supplierCtrl.index',
  show: 'supplierCtrl.show',
  create: 'supplierCtrl.create',
  update: 'supplierCtrl.update',
  destroy: 'supplierCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var supplierIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './supplier.controller': supplierCtrlStub
});

describe('Supplier API Router:', function() {

  it('should return an express router instance', function() {
    supplierIndex.should.equal(routerStub);
  });

  describe('GET /api/suppliers', function() {

    it('should route to supplier.controller.index', function() {
      routerStub.get
        .withArgs('/', 'supplierCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/suppliers/:id', function() {

    it('should route to supplier.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'supplierCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/suppliers', function() {

    it('should route to supplier.controller.create', function() {
      routerStub.post
        .withArgs('/', 'supplierCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/suppliers/:id', function() {

    it('should route to supplier.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'supplierCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/suppliers/:id', function() {

    it('should route to supplier.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'supplierCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/suppliers/:id', function() {

    it('should route to supplier.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'supplierCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
