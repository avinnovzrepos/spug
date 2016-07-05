'use strict';

var app = require('../..');
import request from 'supertest';

var newInventoryHistory;

describe('InventoryHistory API:', function() {

  describe('GET /api/inventory-history', function() {
    var inventoryHistorys;

    beforeEach(function(done) {
      request(app)
        .get('/api/inventory-history')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          inventoryHistorys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      inventoryHistorys.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/inventory-history', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/inventory-history')
        .send({
          name: 'New InventoryHistory',
          info: 'This is the brand new inventoryHistory!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newInventoryHistory = res.body;
          done();
        });
    });

    it('should respond with the newly created inventoryHistory', function() {
      newInventoryHistory.name.should.equal('New InventoryHistory');
      newInventoryHistory.info.should.equal('This is the brand new inventoryHistory!!!');
    });

  });

  describe('GET /api/inventory-history/:id', function() {
    var inventoryHistory;

    beforeEach(function(done) {
      request(app)
        .get('/api/inventory-history/' + newInventoryHistory._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          inventoryHistory = res.body;
          done();
        });
    });

    afterEach(function() {
      inventoryHistory = {};
    });

    it('should respond with the requested inventoryHistory', function() {
      inventoryHistory.name.should.equal('New InventoryHistory');
      inventoryHistory.info.should.equal('This is the brand new inventoryHistory!!!');
    });

  });

  describe('PUT /api/inventory-history/:id', function() {
    var updatedInventoryHistory;

    beforeEach(function(done) {
      request(app)
        .put('/api/inventory-history/' + newInventoryHistory._id)
        .send({
          name: 'Updated InventoryHistory',
          info: 'This is the updated inventoryHistory!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedInventoryHistory = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedInventoryHistory = {};
    });

    it('should respond with the updated inventoryHistory', function() {
      updatedInventoryHistory.name.should.equal('Updated InventoryHistory');
      updatedInventoryHistory.info.should.equal('This is the updated inventoryHistory!!!');
    });

  });

  describe('DELETE /api/inventory-history/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/inventory-history/' + newInventoryHistory._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when inventoryHistory does not exist', function(done) {
      request(app)
        .delete('/api/inventory-history/' + newInventoryHistory._id)
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
