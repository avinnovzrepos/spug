'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var inventoryHistoryCtrlStub = {
  index: 'inventoryHistoryCtrl.index',
  show: 'inventoryHistoryCtrl.show',
  create: 'inventoryHistoryCtrl.create',
  update: 'inventoryHistoryCtrl.update',
  destroy: 'inventoryHistoryCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var inventoryHistoryIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './inventory-history.controller': inventoryHistoryCtrlStub
});

describe('InventoryHistory API Router:', function() {

  it('should return an express router instance', function() {
    inventoryHistoryIndex.should.equal(routerStub);
  });

  describe('GET /api/inventory-history', function() {

    it('should route to inventoryHistory.controller.index', function() {
      routerStub.get
        .withArgs('/', 'inventoryHistoryCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/inventory-history/:id', function() {

    it('should route to inventoryHistory.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'inventoryHistoryCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/inventory-history', function() {

    it('should route to inventoryHistory.controller.create', function() {
      routerStub.post
        .withArgs('/', 'inventoryHistoryCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/inventory-history/:id', function() {

    it('should route to inventoryHistory.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'inventoryHistoryCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/inventory-history/:id', function() {

    it('should route to inventoryHistory.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'inventoryHistoryCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/inventory-history/:id', function() {

    it('should route to inventoryHistory.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'inventoryHistoryCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
