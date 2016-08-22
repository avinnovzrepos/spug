'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var gensetCtrlStub = {
  index: 'gensetCtrl.index',
  show: 'gensetCtrl.show',
  create: 'gensetCtrl.create',
  update: 'gensetCtrl.update',
  destroy: 'gensetCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var gensetIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './genset.controller': gensetCtrlStub
});

describe('Genset API Router:', function() {

  it('should return an express router instance', function() {
    gensetIndex.should.equal(routerStub);
  });

  describe('GET /api/gensets', function() {

    it('should route to genset.controller.index', function() {
      routerStub.get
        .withArgs('/', 'gensetCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/gensets/:id', function() {

    it('should route to genset.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'gensetCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/gensets', function() {

    it('should route to genset.controller.create', function() {
      routerStub.post
        .withArgs('/', 'gensetCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/gensets/:id', function() {

    it('should route to genset.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'gensetCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/gensets/:id', function() {

    it('should route to genset.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'gensetCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/gensets/:id', function() {

    it('should route to genset.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'gensetCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
