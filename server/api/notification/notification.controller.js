'use strict';

import _ from 'lodash';
import Notification from './notification.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    if (!entity) {
      return null;
    }
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
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

// Gets a list of Notifications
export function index(req, res) {
  var query = { active: true };
  if (req.query.plant) {
    query.plant = req.query.plant;
  }
  return Notification.find(query)
    .sort('-createdAt').exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Notification from the DB
export function show(req, res) {
  return Notification.findById(req.params.id).exec()
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Reads a Notification
export function read(req, res) {
  return Notification.findById(req.params.id).exec()
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
    .then(saveUpdates({ read: true }))
    .then(respondWithResult(res, 204))
    .catch(handleError(res));
}
