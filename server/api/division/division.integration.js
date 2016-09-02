'use strict';

var app = require('../..');
import request from 'supertest';

var newDivision;

describe('Division API:', function() {

  describe('GET /api/divisions', function() {
    var divisions;

    beforeEach(function(done) {
      request(app)
        .get('/api/divisions')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          divisions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      divisions.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/divisions', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/divisions')
        .send({
          name: 'New Division',
          info: 'This is the brand new division!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newDivision = res.body;
          done();
        });
    });

    it('should respond with the newly created division', function() {
      newDivision.name.should.equal('New Division');
      newDivision.info.should.equal('This is the brand new division!!!');
    });

  });

  describe('GET /api/divisions/:id', function() {
    var division;

    beforeEach(function(done) {
      request(app)
        .get('/api/divisions/' + newDivision._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          division = res.body;
          done();
        });
    });

    afterEach(function() {
      division = {};
    });

    it('should respond with the requested division', function() {
      division.name.should.equal('New Division');
      division.info.should.equal('This is the brand new division!!!');
    });

  });

  describe('PUT /api/divisions/:id', function() {
    var updatedDivision;

    beforeEach(function(done) {
      request(app)
        .put('/api/divisions/' + newDivision._id)
        .send({
          name: 'Updated Division',
          info: 'This is the updated division!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedDivision = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDivision = {};
    });

    it('should respond with the updated division', function() {
      updatedDivision.name.should.equal('Updated Division');
      updatedDivision.info.should.equal('This is the updated division!!!');
    });

  });

  describe('DELETE /api/divisions/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/divisions/' + newDivision._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when division does not exist', function(done) {
      request(app)
        .delete('/api/divisions/' + newDivision._id)
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
