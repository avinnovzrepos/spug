'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var usageFrequencyCtrlStub = {
  index: 'usageFrequencyCtrl.index',
  show: 'usageFrequencyCtrl.show',
  create: 'usageFrequencyCtrl.create',
  update: 'usageFrequencyCtrl.update',
  destroy: 'usageFrequencyCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var usageFrequencyIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './usage-frequency.controller': usageFrequencyCtrlStub
});

describe('UsageFrequency API Router:', function() {

  it('should return an express router instance', function() {
    usageFrequencyIndex.should.equal(routerStub);
  });

  describe('GET /api/usage-frequency', function() {

    it('should route to usageFrequency.controller.index', function() {
      routerStub.get
        .withArgs('/', 'usageFrequencyCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/usage-frequency/:id', function() {

    it('should route to usageFrequency.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'usageFrequencyCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/usage-frequency', function() {

    it('should route to usageFrequency.controller.create', function() {
      routerStub.post
        .withArgs('/', 'usageFrequencyCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/usage-frequency/:id', function() {

    it('should route to usageFrequency.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'usageFrequencyCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/usage-frequency/:id', function() {

    it('should route to usageFrequency.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'usageFrequencyCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/usage-frequency/:id', function() {

    it('should route to usageFrequency.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'usageFrequencyCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
