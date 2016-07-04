/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/login-history              ->  index
 * POST    /api/login-history              ->  create
 * GET     /api/login-history/:id          ->  show
 * PUT     /api/login-history/:id          ->  update
 * DELETE  /api/login-history/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import LoginHistory from './login-history.model';
import User from '../user/user.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of LoginHistory
export function index(req, res) {
  return LoginHistory.find()
    .populate('user', 'name plant email role').exec()
    .catch(handleError(res))
    .then(respondWithResult(res))
}

// Gets list of LoginHistory by user
export function byUser(req, res) {
  return LoginHistory.find({
    user: req.params.id
  }).populate('user', 'name plant email role').exec()
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets list of LoginHistory by plant
export function byPlant(req, res) {
  console.log("PLANT", {
    'user.plant': req.params.id
  })
  User.find({ plant: req.params.id }).exec()
    .catch(handleError(res))
    .then( users => {
      LoginHistory.find({
        user: {
          $in: users
        }
      }).populate('user', 'name plant email role').exec()
        .catch(handleError(res))
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res));
    });
}
