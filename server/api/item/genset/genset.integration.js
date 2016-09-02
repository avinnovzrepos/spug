'use strict';

var app = require('../..');
import request from 'supertest';

var newGenset;

describe('Genset API:', function() {

  describe('GET /api/gensets', function() {
    var gensets;

    beforeEach(function(done) {
      request(app)
        .get('/api/gensets')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          gensets = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      gensets.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/gensets', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/gensets')
        .send({
          name: 'New Genset',
          info: 'This is the brand new genset!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newGenset = res.body;
          done();
        });
    });

    it('should respond with the newly created genset', function() {
      newGenset.name.should.equal('New Genset');
      newGenset.info.should.equal('This is the brand new genset!!!');
    });

  });

  describe('GET /api/gensets/:id', function() {
    var genset;

    beforeEach(function(done) {
      request(app)
        .get('/api/gensets/' + newGenset._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          genset = res.body;
          done();
        });
    });

    afterEach(function() {
      genset = {};
    });

    it('should respond with the requested genset', function() {
      genset.name.should.equal('New Genset');
      genset.info.should.equal('This is the brand new genset!!!');
    });

  });

  describe('PUT /api/gensets/:id', function() {
    var updatedGenset;

    beforeEach(function(done) {
      request(app)
        .put('/api/gensets/' + newGenset._id)
        .send({
          name: 'Updated Genset',
          info: 'This is the updated genset!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedGenset = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedGenset = {};
    });

    it('should respond with the updated genset', function() {
      updatedGenset.name.should.equal('Updated Genset');
      updatedGenset.info.should.equal('This is the updated genset!!!');
    });

  });

  describe('DELETE /api/gensets/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/gensets/' + newGenset._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when genset does not exist', function(done) {
      request(app)
        .delete('/api/gensets/' + newGenset._id)
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
