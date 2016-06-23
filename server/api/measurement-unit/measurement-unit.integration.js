'use strict';

var app = require('../..');
import request from 'supertest';

var newMeasurementUnit;

describe('MeasurementUnit API:', function() {

  describe('GET /api/measurement-units', function() {
    var measurementUnits;

    beforeEach(function(done) {
      request(app)
        .get('/api/measurement-units')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          measurementUnits = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      measurementUnits.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/measurement-units', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/measurement-units')
        .send({
          name: 'New MeasurementUnit',
          info: 'This is the brand new measurementUnit!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMeasurementUnit = res.body;
          done();
        });
    });

    it('should respond with the newly created measurementUnit', function() {
      newMeasurementUnit.name.should.equal('New MeasurementUnit');
      newMeasurementUnit.info.should.equal('This is the brand new measurementUnit!!!');
    });

  });

  describe('GET /api/measurement-units/:id', function() {
    var measurementUnit;

    beforeEach(function(done) {
      request(app)
        .get('/api/measurement-units/' + newMeasurementUnit._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          measurementUnit = res.body;
          done();
        });
    });

    afterEach(function() {
      measurementUnit = {};
    });

    it('should respond with the requested measurementUnit', function() {
      measurementUnit.name.should.equal('New MeasurementUnit');
      measurementUnit.info.should.equal('This is the brand new measurementUnit!!!');
    });

  });

  describe('PUT /api/measurement-units/:id', function() {
    var updatedMeasurementUnit;

    beforeEach(function(done) {
      request(app)
        .put('/api/measurement-units/' + newMeasurementUnit._id)
        .send({
          name: 'Updated MeasurementUnit',
          info: 'This is the updated measurementUnit!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMeasurementUnit = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMeasurementUnit = {};
    });

    it('should respond with the updated measurementUnit', function() {
      updatedMeasurementUnit.name.should.equal('Updated MeasurementUnit');
      updatedMeasurementUnit.info.should.equal('This is the updated measurementUnit!!!');
    });

  });

  describe('DELETE /api/measurement-units/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/measurement-units/' + newMeasurementUnit._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when measurementUnit does not exist', function(done) {
      request(app)
        .delete('/api/measurement-units/' + newMeasurementUnit._id)
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
