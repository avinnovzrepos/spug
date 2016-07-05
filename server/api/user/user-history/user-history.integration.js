'use strict';

var app = require('../..');
import request from 'supertest';

var newUserHistory;

describe('UserHistory API:', function() {

  describe('GET /api/user-history', function() {
    var userHistorys;

    beforeEach(function(done) {
      request(app)
        .get('/api/user-history')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          userHistorys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      userHistorys.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/user-history', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/user-history')
        .send({
          name: 'New UserHistory',
          info: 'This is the brand new userHistory!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newUserHistory = res.body;
          done();
        });
    });

    it('should respond with the newly created userHistory', function() {
      newUserHistory.name.should.equal('New UserHistory');
      newUserHistory.info.should.equal('This is the brand new userHistory!!!');
    });

  });

  describe('GET /api/user-history/:id', function() {
    var userHistory;

    beforeEach(function(done) {
      request(app)
        .get('/api/user-history/' + newUserHistory._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          userHistory = res.body;
          done();
        });
    });

    afterEach(function() {
      userHistory = {};
    });

    it('should respond with the requested userHistory', function() {
      userHistory.name.should.equal('New UserHistory');
      userHistory.info.should.equal('This is the brand new userHistory!!!');
    });

  });

  describe('PUT /api/user-history/:id', function() {
    var updatedUserHistory;

    beforeEach(function(done) {
      request(app)
        .put('/api/user-history/' + newUserHistory._id)
        .send({
          name: 'Updated UserHistory',
          info: 'This is the updated userHistory!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedUserHistory = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedUserHistory = {};
    });

    it('should respond with the updated userHistory', function() {
      updatedUserHistory.name.should.equal('Updated UserHistory');
      updatedUserHistory.info.should.equal('This is the updated userHistory!!!');
    });

  });

  describe('DELETE /api/user-history/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/user-history/' + newUserHistory._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when userHistory does not exist', function(done) {
      request(app)
        .delete('/api/user-history/' + newUserHistory._id)
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
