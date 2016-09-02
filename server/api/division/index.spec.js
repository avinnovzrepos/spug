'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var divisionCtrlStub = {
  index: 'divisionCtrl.index',
  show: 'divisionCtrl.show',
  create: 'divisionCtrl.create',
  update: 'divisionCtrl.update',
  destroy: 'divisionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var divisionIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './division.controller': divisionCtrlStub
});

describe('Division API Router:', function() {

  it('should return an express router instance', function() {
    divisionIndex.should.equal(routerStub);
  });

  describe('GET /api/divisions', function() {

    it('should route to division.controller.index', function() {
      routerStub.get
        .withArgs('/', 'divisionCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/divisions/:id', function() {

    it('should route to division.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'divisionCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/divisions', function() {

    it('should route to division.controller.create', function() {
      routerStub.post
        .withArgs('/', 'divisionCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/divisions/:id', function() {

    it('should route to division.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'divisionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/divisions/:id', function() {

    it('should route to division.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'divisionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/divisions/:id', function() {

    it('should route to division.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'divisionCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
