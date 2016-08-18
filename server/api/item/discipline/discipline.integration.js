'use strict';

var app = require('../..');
import request from 'supertest';

var newDiscipline;

describe('Discipline API:', function() {

  describe('GET /api/disciplines', function() {
    var disciplines;

    beforeEach(function(done) {
      request(app)
        .get('/api/disciplines')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          disciplines = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      disciplines.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/disciplines', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/disciplines')
        .send({
          name: 'New Discipline',
          info: 'This is the brand new discipline!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newDiscipline = res.body;
          done();
        });
    });

    it('should respond with the newly created discipline', function() {
      newDiscipline.name.should.equal('New Discipline');
      newDiscipline.info.should.equal('This is the brand new discipline!!!');
    });

  });

  describe('GET /api/disciplines/:id', function() {
    var discipline;

    beforeEach(function(done) {
      request(app)
        .get('/api/disciplines/' + newDiscipline._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          discipline = res.body;
          done();
        });
    });

    afterEach(function() {
      discipline = {};
    });

    it('should respond with the requested discipline', function() {
      discipline.name.should.equal('New Discipline');
      discipline.info.should.equal('This is the brand new discipline!!!');
    });

  });

  describe('PUT /api/disciplines/:id', function() {
    var updatedDiscipline;

    beforeEach(function(done) {
      request(app)
        .put('/api/disciplines/' + newDiscipline._id)
        .send({
          name: 'Updated Discipline',
          info: 'This is the updated discipline!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedDiscipline = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDiscipline = {};
    });

    it('should respond with the updated discipline', function() {
      updatedDiscipline.name.should.equal('Updated Discipline');
      updatedDiscipline.info.should.equal('This is the updated discipline!!!');
    });

  });

  describe('DELETE /api/disciplines/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/disciplines/' + newDiscipline._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when discipline does not exist', function(done) {
      request(app)
        .delete('/api/disciplines/' + newDiscipline._id)
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
