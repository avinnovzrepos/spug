'use strict';

var app = require('../..');
import request from 'supertest';

var newClassification;

describe('Classification API:', function() {

  describe('GET /api/classifications', function() {
    var classifications;

    beforeEach(function(done) {
      request(app)
        .get('/api/classifications')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          classifications = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      classifications.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/classifications', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/classifications')
        .send({
          name: 'New Classification',
          info: 'This is the brand new classification!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newClassification = res.body;
          done();
        });
    });

    it('should respond with the newly created classification', function() {
      newClassification.name.should.equal('New Classification');
      newClassification.info.should.equal('This is the brand new classification!!!');
    });

  });

  describe('GET /api/classifications/:id', function() {
    var classification;

    beforeEach(function(done) {
      request(app)
        .get('/api/classifications/' + newClassification._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          classification = res.body;
          done();
        });
    });

    afterEach(function() {
      classification = {};
    });

    it('should respond with the requested classification', function() {
      classification.name.should.equal('New Classification');
      classification.info.should.equal('This is the brand new classification!!!');
    });

  });

  describe('PUT /api/classifications/:id', function() {
    var updatedClassification;

    beforeEach(function(done) {
      request(app)
        .put('/api/classifications/' + newClassification._id)
        .send({
          name: 'Updated Classification',
          info: 'This is the updated classification!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedClassification = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedClassification = {};
    });

    it('should respond with the updated classification', function() {
      updatedClassification.name.should.equal('Updated Classification');
      updatedClassification.info.should.equal('This is the updated classification!!!');
    });

  });

  describe('DELETE /api/classifications/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/classifications/' + newClassification._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when classification does not exist', function(done) {
      request(app)
        .delete('/api/classifications/' + newClassification._id)
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
