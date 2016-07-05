'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var userHistoryCtrlStub = {
  index: 'userHistoryCtrl.index',
  show: 'userHistoryCtrl.show',
  create: 'userHistoryCtrl.create',
  update: 'userHistoryCtrl.update',
  destroy: 'userHistoryCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var userHistoryIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './user-history.controller': userHistoryCtrlStub
});

describe('UserHistory API Router:', function() {

  it('should return an express router instance', function() {
    userHistoryIndex.should.equal(routerStub);
  });

  describe('GET /api/user-history', function() {

    it('should route to userHistory.controller.index', function() {
      routerStub.get
        .withArgs('/', 'userHistoryCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/user-history/:id', function() {

    it('should route to userHistory.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'userHistoryCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/user-history', function() {

    it('should route to userHistory.controller.create', function() {
      routerStub.post
        .withArgs('/', 'userHistoryCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/user-history/:id', function() {

    it('should route to userHistory.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'userHistoryCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/user-history/:id', function() {

    it('should route to userHistory.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'userHistoryCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/user-history/:id', function() {

    it('should route to userHistory.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'userHistoryCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
