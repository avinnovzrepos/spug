'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var receivingCtrlStub = {
  index: 'receivingCtrl.index',
  show: 'receivingCtrl.show',
  create: 'receivingCtrl.create',
  update: 'receivingCtrl.update',
  destroy: 'receivingCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var receivingIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './receiving.controller': receivingCtrlStub
});

describe('Receiving API Router:', function() {

  it('should return an express router instance', function() {
    receivingIndex.should.equal(routerStub);
  });

  describe('GET /api/receiving', function() {

    it('should route to receiving.controller.index', function() {
      routerStub.get
        .withArgs('/', 'receivingCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/receiving/:id', function() {

    it('should route to receiving.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'receivingCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/receiving', function() {

    it('should route to receiving.controller.create', function() {
      routerStub.post
        .withArgs('/', 'receivingCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/receiving/:id', function() {

    it('should route to receiving.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'receivingCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/receiving/:id', function() {

    it('should route to receiving.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'receivingCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/receiving/:id', function() {

    it('should route to receiving.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'receivingCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
