'use strict';

var app = require('../..');
import request from 'supertest';

var newPurchaseOrder;

describe('PurchaseOrder API:', function() {

  describe('GET /api/purchase-orders', function() {
    var purchaseOrders;

    beforeEach(function(done) {
      request(app)
        .get('/api/purchase-orders')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          purchaseOrders = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      purchaseOrders.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/purchase-orders', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/purchase-orders')
        .send({
          name: 'New PurchaseOrder',
          info: 'This is the brand new purchaseOrder!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPurchaseOrder = res.body;
          done();
        });
    });

    it('should respond with the newly created purchaseOrder', function() {
      newPurchaseOrder.name.should.equal('New PurchaseOrder');
      newPurchaseOrder.info.should.equal('This is the brand new purchaseOrder!!!');
    });

  });

  describe('GET /api/purchase-orders/:id', function() {
    var purchaseOrder;

    beforeEach(function(done) {
      request(app)
        .get('/api/purchase-orders/' + newPurchaseOrder._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          purchaseOrder = res.body;
          done();
        });
    });

    afterEach(function() {
      purchaseOrder = {};
    });

    it('should respond with the requested purchaseOrder', function() {
      purchaseOrder.name.should.equal('New PurchaseOrder');
      purchaseOrder.info.should.equal('This is the brand new purchaseOrder!!!');
    });

  });

  describe('PUT /api/purchase-orders/:id', function() {
    var updatedPurchaseOrder;

    beforeEach(function(done) {
      request(app)
        .put('/api/purchase-orders/' + newPurchaseOrder._id)
        .send({
          name: 'Updated PurchaseOrder',
          info: 'This is the updated purchaseOrder!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPurchaseOrder = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPurchaseOrder = {};
    });

    it('should respond with the updated purchaseOrder', function() {
      updatedPurchaseOrder.name.should.equal('Updated PurchaseOrder');
      updatedPurchaseOrder.info.should.equal('This is the updated purchaseOrder!!!');
    });

  });

  describe('DELETE /api/purchase-orders/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/purchase-orders/' + newPurchaseOrder._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when purchaseOrder does not exist', function(done) {
      request(app)
        .delete('/api/purchase-orders/' + newPurchaseOrder._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
