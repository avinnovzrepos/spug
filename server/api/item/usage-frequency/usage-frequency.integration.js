'use strict';

var app = require('../..');
import request from 'supertest';

var newUsageFrequency;

describe('UsageFrequency API:', function() {

  describe('GET /api/usage-frequency', function() {
    var usageFrequencys;

    beforeEach(function(done) {
      request(app)
        .get('/api/usage-frequency')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          usageFrequencys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      usageFrequencys.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/usage-frequency', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/usage-frequency')
        .send({
          name: 'New UsageFrequency',
          info: 'This is the brand new usageFrequency!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newUsageFrequency = res.body;
          done();
        });
    });

    it('should respond with the newly created usageFrequency', function() {
      newUsageFrequency.name.should.equal('New UsageFrequency');
      newUsageFrequency.info.should.equal('This is the brand new usageFrequency!!!');
    });

  });

  describe('GET /api/usage-frequency/:id', function() {
    var usageFrequency;

    beforeEach(function(done) {
      request(app)
        .get('/api/usage-frequency/' + newUsageFrequency._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          usageFrequency = res.body;
          done();
        });
    });

    afterEach(function() {
      usageFrequency = {};
    });

    it('should respond with the requested usageFrequency', function() {
      usageFrequency.name.should.equal('New UsageFrequency');
      usageFrequency.info.should.equal('This is the brand new usageFrequency!!!');
    });

  });

  describe('PUT /api/usage-frequency/:id', function() {
    var updatedUsageFrequency;

    beforeEach(function(done) {
      request(app)
        .put('/api/usage-frequency/' + newUsageFrequency._id)
        .send({
          name: 'Updated UsageFrequency',
          info: 'This is the updated usageFrequency!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedUsageFrequency = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedUsageFrequency = {};
    });

    it('should respond with the updated usageFrequency', function() {
      updatedUsageFrequency.name.should.equal('Updated UsageFrequency');
      updatedUsageFrequency.info.should.equal('This is the updated usageFrequency!!!');
    });

  });

  describe('DELETE /api/usage-frequency/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/usage-frequency/' + newUsageFrequency._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when usageFrequency does not exist', function(done) {
      request(app)
        .delete('/api/usage-frequency/' + newUsageFrequency._id)
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
