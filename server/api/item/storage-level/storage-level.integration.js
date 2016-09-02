'use strict';

var app = require('../..');
import request from 'supertest';

var newStorageLevel;

describe('StorageLevel API:', function() {

  describe('GET /api/storage-levels', function() {
    var storageLevels;

    beforeEach(function(done) {
      request(app)
        .get('/api/storage-levels')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          storageLevels = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      storageLevels.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/storage-levels', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/storage-levels')
        .send({
          name: 'New StorageLevel',
          info: 'This is the brand new storageLevel!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newStorageLevel = res.body;
          done();
        });
    });

    it('should respond with the newly created storageLevel', function() {
      newStorageLevel.name.should.equal('New StorageLevel');
      newStorageLevel.info.should.equal('This is the brand new storageLevel!!!');
    });

  });

  describe('GET /api/storage-levels/:id', function() {
    var storageLevel;

    beforeEach(function(done) {
      request(app)
        .get('/api/storage-levels/' + newStorageLevel._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          storageLevel = res.body;
          done();
        });
    });

    afterEach(function() {
      storageLevel = {};
    });

    it('should respond with the requested storageLevel', function() {
      storageLevel.name.should.equal('New StorageLevel');
      storageLevel.info.should.equal('This is the brand new storageLevel!!!');
    });

  });

  describe('PUT /api/storage-levels/:id', function() {
    var updatedStorageLevel;

    beforeEach(function(done) {
      request(app)
        .put('/api/storage-levels/' + newStorageLevel._id)
        .send({
          name: 'Updated StorageLevel',
          info: 'This is the updated storageLevel!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedStorageLevel = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedStorageLevel = {};
    });

    it('should respond with the updated storageLevel', function() {
      updatedStorageLevel.name.should.equal('Updated StorageLevel');
      updatedStorageLevel.info.should.equal('This is the updated storageLevel!!!');
    });

  });

  describe('DELETE /api/storage-levels/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/storage-levels/' + newStorageLevel._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when storageLevel does not exist', function(done) {
      request(app)
        .delete('/api/storage-levels/' + newStorageLevel._id)
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
