'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var plantCtrlStub = {
  index: 'plantCtrl.index',
  show: 'plantCtrl.show',
  create: 'plantCtrl.create',
  update: 'plantCtrl.update',
  destroy: 'plantCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var plantIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './plant.controller': plantCtrlStub
});

describe('Plant API Router:', function() {

  it('should return an express router instance', function() {
    plantIndex.should.equal(routerStub);
  });

  describe('GET /api/plants', function() {

    it('should route to plant.controller.index', function() {
      routerStub.get
        .withArgs('/', 'plantCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/plants/:id', function() {

    it('should route to plant.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'plantCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/plants', function() {

    it('should route to plant.controller.create', function() {
      routerStub.post
        .withArgs('/', 'plantCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/plants/:id', function() {

    it('should route to plant.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'plantCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/plants/:id', function() {

    it('should route to plant.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'plantCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/plants/:id', function() {

    it('should route to plant.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'plantCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
