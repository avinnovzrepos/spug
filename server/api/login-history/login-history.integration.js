'use strict';

var app = require('../..');
import request from 'supertest';

var newLoginHistory;

describe('LoginHistory API:', function() {

  describe('GET /api/login-history', function() {
    var loginHistorys;

    beforeEach(function(done) {
      request(app)
        .get('/api/login-history')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          loginHistorys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      loginHistorys.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/login-history', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/login-history')
        .send({
          name: 'New LoginHistory',
          info: 'This is the brand new loginHistory!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newLoginHistory = res.body;
          done();
        });
    });

    it('should respond with the newly created loginHistory', function() {
      newLoginHistory.name.should.equal('New LoginHistory');
      newLoginHistory.info.should.equal('This is the brand new loginHistory!!!');
    });

  });

  describe('GET /api/login-history/:id', function() {
    var loginHistory;

    beforeEach(function(done) {
      request(app)
        .get('/api/login-history/' + newLoginHistory._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          loginHistory = res.body;
          done();
        });
    });

    afterEach(function() {
      loginHistory = {};
    });

    it('should respond with the requested loginHistory', function() {
      loginHistory.name.should.equal('New LoginHistory');
      loginHistory.info.should.equal('This is the brand new loginHistory!!!');
    });

  });

  describe('PUT /api/login-history/:id', function() {
    var updatedLoginHistory;

    beforeEach(function(done) {
      request(app)
        .put('/api/login-history/' + newLoginHistory._id)
        .send({
          name: 'Updated LoginHistory',
          info: 'This is the updated loginHistory!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedLoginHistory = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedLoginHistory = {};
    });

    it('should respond with the updated loginHistory', function() {
      updatedLoginHistory.name.should.equal('Updated LoginHistory');
      updatedLoginHistory.info.should.equal('This is the updated loginHistory!!!');
    });

  });

  describe('DELETE /api/login-history/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/login-history/' + newLoginHistory._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when loginHistory does not exist', function(done) {
      request(app)
        .delete('/api/login-history/' + newLoginHistory._id)
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
