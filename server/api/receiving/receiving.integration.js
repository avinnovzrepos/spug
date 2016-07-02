'use strict';

var app = require('../..');
import request from 'supertest';

var newReceiving;

describe('Receiving API:', function() {

  describe('GET /api/receiving', function() {
    var receivings;

    beforeEach(function(done) {
      request(app)
        .get('/api/receiving')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          receivings = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      receivings.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/receiving', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/receiving')
        .send({
          name: 'New Receiving',
          info: 'This is the brand new receiving!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newReceiving = res.body;
          done();
        });
    });

    it('should respond with the newly created receiving', function() {
      newReceiving.name.should.equal('New Receiving');
      newReceiving.info.should.equal('This is the brand new receiving!!!');
    });

  });

  describe('GET /api/receiving/:id', function() {
    var receiving;

    beforeEach(function(done) {
      request(app)
        .get('/api/receiving/' + newReceiving._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          receiving = res.body;
          done();
        });
    });

    afterEach(function() {
      receiving = {};
    });

    it('should respond with the requested receiving', function() {
      receiving.name.should.equal('New Receiving');
      receiving.info.should.equal('This is the brand new receiving!!!');
    });

  });

  describe('PUT /api/receiving/:id', function() {
    var updatedReceiving;

    beforeEach(function(done) {
      request(app)
        .put('/api/receiving/' + newReceiving._id)
        .send({
          name: 'Updated Receiving',
          info: 'This is the updated receiving!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedReceiving = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedReceiving = {};
    });

    it('should respond with the updated receiving', function() {
      updatedReceiving.name.should.equal('Updated Receiving');
      updatedReceiving.info.should.equal('This is the updated receiving!!!');
    });

  });

  describe('DELETE /api/receiving/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/receiving/' + newReceiving._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when receiving does not exist', function(done) {
      request(app)
        .delete('/api/receiving/' + newReceiving._id)
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
