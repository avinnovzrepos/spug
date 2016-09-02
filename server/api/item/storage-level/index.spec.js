'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var storageLevelCtrlStub = {
  index: 'storageLevelCtrl.index',
  show: 'storageLevelCtrl.show',
  create: 'storageLevelCtrl.create',
  update: 'storageLevelCtrl.update',
  destroy: 'storageLevelCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var storageLevelIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './storage-level.controller': storageLevelCtrlStub
});

describe('StorageLevel API Router:', function() {

  it('should return an express router instance', function() {
    storageLevelIndex.should.equal(routerStub);
  });

  describe('GET /api/storage-levels', function() {

    it('should route to storageLevel.controller.index', function() {
      routerStub.get
        .withArgs('/', 'storageLevelCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/storage-levels/:id', function() {

    it('should route to storageLevel.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'storageLevelCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/storage-levels', function() {

    it('should route to storageLevel.controller.create', function() {
      routerStub.post
        .withArgs('/', 'storageLevelCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/storage-levels/:id', function() {

    it('should route to storageLevel.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'storageLevelCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/storage-levels/:id', function() {

    it('should route to storageLevel.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'storageLevelCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/storage-levels/:id', function() {

    it('should route to storageLevel.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'storageLevelCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
