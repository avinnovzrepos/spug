'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var purchaseOrderCtrlStub = {
  index: 'purchaseOrderCtrl.index',
  show: 'purchaseOrderCtrl.show',
  create: 'purchaseOrderCtrl.create',
  update: 'purchaseOrderCtrl.update',
  destroy: 'purchaseOrderCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var purchaseOrderIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './purchase-order.controller': purchaseOrderCtrlStub
});

describe('PurchaseOrder API Router:', function() {

  it('should return an express router instance', function() {
    purchaseOrderIndex.should.equal(routerStub);
  });

  describe('GET /api/purchase-orders', function() {

    it('should route to purchaseOrder.controller.index', function() {
      routerStub.get
        .withArgs('/', 'purchaseOrderCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/purchase-orders/:id', function() {

    it('should route to purchaseOrder.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'purchaseOrderCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/purchase-orders', function() {

    it('should route to purchaseOrder.controller.create', function() {
      routerStub.post
        .withArgs('/', 'purchaseOrderCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/purchase-orders/:id', function() {

    it('should route to purchaseOrder.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'purchaseOrderCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/purchase-orders/:id', function() {

    it('should route to purchaseOrder.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'purchaseOrderCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/purchase-orders/:id', function() {

    it('should route to purchaseOrder.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'purchaseOrderCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
