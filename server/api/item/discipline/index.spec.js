'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var disciplineCtrlStub = {
  index: 'disciplineCtrl.index',
  show: 'disciplineCtrl.show',
  create: 'disciplineCtrl.create',
  update: 'disciplineCtrl.update',
  destroy: 'disciplineCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var disciplineIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './discipline.controller': disciplineCtrlStub
});

describe('Discipline API Router:', function() {

  it('should return an express router instance', function() {
    disciplineIndex.should.equal(routerStub);
  });

  describe('GET /api/disciplines', function() {

    it('should route to discipline.controller.index', function() {
      routerStub.get
        .withArgs('/', 'disciplineCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/disciplines/:id', function() {

    it('should route to discipline.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'disciplineCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/disciplines', function() {

    it('should route to discipline.controller.create', function() {
      routerStub.post
        .withArgs('/', 'disciplineCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/disciplines/:id', function() {

    it('should route to discipline.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'disciplineCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/disciplines/:id', function() {

    it('should route to discipline.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'disciplineCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/disciplines/:id', function() {

    it('should route to discipline.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'disciplineCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
