'use strict';

import _ from 'lodash';
import UserHistory from './user-history.model';
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

// Gets a list of UserHistory
export function index(req, res) {
  return UserHistory.find()
    .populate('user', 'name plant email role').exec()
    .catch(handleError(res))
    .then(respondWithResult(res));
}

// Gets list of UserHistory by user
export function byUser(req, res) {
  return UserHistory.find({
    user: req.params.id
  }).populate('modifiedBy', 'name plant email role').exec()
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res));
}
