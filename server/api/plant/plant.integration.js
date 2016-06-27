'use strict';

var app = require('../..');
import request from 'supertest';

var newPlant;

describe('Plant API:', function() {

  describe('GET /api/plants', function() {
    var plants;

    beforeEach(function(done) {
      request(app)
        .get('/api/plants')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          plants = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      plants.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/plants', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/plants')
        .send({
          name: 'New Plant',
          info: 'This is the brand new plant!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPlant = res.body;
          done();
        });
    });

    it('should respond with the newly created plant', function() {
      newPlant.name.should.equal('New Plant');
      newPlant.info.should.equal('This is the brand new plant!!!');
    });

  });

  describe('GET /api/plants/:id', function() {
    var plant;

    beforeEach(function(done) {
      request(app)
        .get('/api/plants/' + newPlant._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          plant = res.body;
          done();
        });
    });

    afterEach(function() {
      plant = {};
    });

    it('should respond with the requested plant', function() {
      plant.name.should.equal('New Plant');
      plant.info.should.equal('This is the brand new plant!!!');
    });

  });

  describe('PUT /api/plants/:id', function() {
    var updatedPlant;

    beforeEach(function(done) {
      request(app)
        .put('/api/plants/' + newPlant._id)
        .send({
          name: 'Updated Plant',
          info: 'This is the updated plant!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPlant = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPlant = {};
    });

    it('should respond with the updated plant', function() {
      updatedPlant.name.should.equal('Updated Plant');
      updatedPlant.info.should.equal('This is the updated plant!!!');
    });

  });

  describe('DELETE /api/plants/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/plants/' + newPlant._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when plant does not exist', function(done) {
      request(app)
        .delete('/api/plants/' + newPlant._id)
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
