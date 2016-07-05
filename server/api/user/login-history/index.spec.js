'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var loginHistoryCtrlStub = {
  index: 'loginHistoryCtrl.index',
  show: 'loginHistoryCtrl.show',
  create: 'loginHistoryCtrl.create',
  update: 'loginHistoryCtrl.update',
  destroy: 'loginHistoryCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var loginHistoryIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './login-history.controller': loginHistoryCtrlStub
});

describe('LoginHistory API Router:', function() {

  it('should return an express router instance', function() {
    loginHistoryIndex.should.equal(routerStub);
  });

  describe('GET /api/login-history', function() {

    it('should route to loginHistory.controller.index', function() {
      routerStub.get
        .withArgs('/', 'loginHistoryCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/login-history/:id', function() {

    it('should route to loginHistory.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'loginHistoryCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/login-history', function() {

    it('should route to loginHistory.controller.create', function() {
      routerStub.post
        .withArgs('/', 'loginHistoryCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/login-history/:id', function() {

    it('should route to loginHistory.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'loginHistoryCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/login-history/:id', function() {

    it('should route to loginHistory.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'loginHistoryCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/login-history/:id', function() {

    it('should route to loginHistory.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'loginHistoryCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
