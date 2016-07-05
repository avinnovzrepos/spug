'use strict';

var app = require('../..');
import request from 'supertest';

var newInventory;

describe('Inventory API:', function() {

  describe('GET /api/inventory', function() {
    var inventorys;

    beforeEach(function(done) {
      request(app)
        .get('/api/inventory')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          inventorys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      inventorys.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/inventory', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/inventory')
        .send({
          name: 'New Inventory',
          info: 'This is the brand new inventory!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newInventory = res.body;
          done();
        });
    });

    it('should respond with the newly created inventory', function() {
      newInventory.name.should.equal('New Inventory');
      newInventory.info.should.equal('This is the brand new inventory!!!');
    });

  });

  describe('GET /api/inventory/:id', function() {
    var inventory;

    beforeEach(function(done) {
      request(app)
        .get('/api/inventory/' + newInventory._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          inventory = res.body;
          done();
        });
    });

    afterEach(function() {
      inventory = {};
    });

    it('should respond with the requested inventory', function() {
      inventory.name.should.equal('New Inventory');
      inventory.info.should.equal('This is the brand new inventory!!!');
    });

  });

  describe('PUT /api/inventory/:id', function() {
    var updatedInventory;

    beforeEach(function(done) {
      request(app)
        .put('/api/inventory/' + newInventory._id)
        .send({
          name: 'Updated Inventory',
          info: 'This is the updated inventory!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedInventory = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedInventory = {};
    });

    it('should respond with the updated inventory', function() {
      updatedInventory.name.should.equal('Updated Inventory');
      updatedInventory.info.should.equal('This is the updated inventory!!!');
    });

  });

  describe('DELETE /api/inventory/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/inventory/' + newInventory._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when inventory does not exist', function(done) {
      request(app)
        .delete('/api/inventory/' + newInventory._id)
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
