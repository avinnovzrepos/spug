'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var componentCtrlStub = {
  index: 'componentCtrl.index',
  show: 'componentCtrl.show',
  create: 'componentCtrl.create',
  update: 'componentCtrl.update',
  destroy: 'componentCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var componentIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './component.controller': componentCtrlStub
});

describe('Component API Router:', function() {

  it('should return an express router instance', function() {
    componentIndex.should.equal(routerStub);
  });

  describe('GET /api/components', function() {

    it('should route to component.controller.index', function() {
      routerStub.get
        .withArgs('/', 'componentCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/components/:id', function() {

    it('should route to component.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'componentCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/components', function() {

    it('should route to component.controller.create', function() {
      routerStub.post
        .withArgs('/', 'componentCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/components/:id', function() {

    it('should route to component.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'componentCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/components/:id', function() {

    it('should route to component.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'componentCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/components/:id', function() {

    it('should route to component.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'componentCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
