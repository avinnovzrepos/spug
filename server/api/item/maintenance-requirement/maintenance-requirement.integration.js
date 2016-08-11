'use strict';

var app = require('../..');
import request from 'supertest';

var newMaintenanceRequirement;

describe('MaintenanceRequirement API:', function() {

  describe('GET /api/maintenance-requirements', function() {
    var maintenanceRequirements;

    beforeEach(function(done) {
      request(app)
        .get('/api/maintenance-requirements')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          maintenanceRequirements = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      maintenanceRequirements.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/maintenance-requirements', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/maintenance-requirements')
        .send({
          name: 'New MaintenanceRequirement',
          info: 'This is the brand new maintenanceRequirement!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMaintenanceRequirement = res.body;
          done();
        });
    });

    it('should respond with the newly created maintenanceRequirement', function() {
      newMaintenanceRequirement.name.should.equal('New MaintenanceRequirement');
      newMaintenanceRequirement.info.should.equal('This is the brand new maintenanceRequirement!!!');
    });

  });

  describe('GET /api/maintenance-requirements/:id', function() {
    var maintenanceRequirement;

    beforeEach(function(done) {
      request(app)
        .get('/api/maintenance-requirements/' + newMaintenanceRequirement._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          maintenanceRequirement = res.body;
          done();
        });
    });

    afterEach(function() {
      maintenanceRequirement = {};
    });

    it('should respond with the requested maintenanceRequirement', function() {
      maintenanceRequirement.name.should.equal('New MaintenanceRequirement');
      maintenanceRequirement.info.should.equal('This is the brand new maintenanceRequirement!!!');
    });

  });

  describe('PUT /api/maintenance-requirements/:id', function() {
    var updatedMaintenanceRequirement;

    beforeEach(function(done) {
      request(app)
        .put('/api/maintenance-requirements/' + newMaintenanceRequirement._id)
        .send({
          name: 'Updated MaintenanceRequirement',
          info: 'This is the updated maintenanceRequirement!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMaintenanceRequirement = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMaintenanceRequirement = {};
    });

    it('should respond with the updated maintenanceRequirement', function() {
      updatedMaintenanceRequirement.name.should.equal('Updated MaintenanceRequirement');
      updatedMaintenanceRequirement.info.should.equal('This is the updated maintenanceRequirement!!!');
    });

  });

  describe('DELETE /api/maintenance-requirements/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/maintenance-requirements/' + newMaintenanceRequirement._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when maintenanceRequirement does not exist', function(done) {
      request(app)
        .delete('/api/maintenance-requirements/' + newMaintenanceRequirement._id)
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
