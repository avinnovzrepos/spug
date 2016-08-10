'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var classificationCtrlStub = {
  index: 'classificationCtrl.index',
  show: 'classificationCtrl.show',
  create: 'classificationCtrl.create',
  update: 'classificationCtrl.update',
  destroy: 'classificationCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var classificationIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './classification.controller': classificationCtrlStub
});

describe('Classification API Router:', function() {

  it('should return an express router instance', function() {
    classificationIndex.should.equal(routerStub);
  });

  describe('GET /api/classifications', function() {

    it('should route to classification.controller.index', function() {
      routerStub.get
        .withArgs('/', 'classificationCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/classifications/:id', function() {

    it('should route to classification.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'classificationCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/classifications', function() {

    it('should route to classification.controller.create', function() {
      routerStub.post
        .withArgs('/', 'classificationCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/classifications/:id', function() {

    it('should route to classification.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'classificationCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/classifications/:id', function() {

    it('should route to classification.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'classificationCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/classifications/:id', function() {

    it('should route to classification.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'classificationCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
