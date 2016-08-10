/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/divisions              ->  index
 * POST    /api/divisions              ->  create
 * GET     /api/divisions/:id          ->  show
 * PUT     /api/divisions/:id          ->  update
 * DELETE  /api/divisions/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Division from './division.model';

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

// Gets a list of Divisions
export function index(req, res) {
  return Division.find({active: true})
    .populate('department').exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Division from the DB
export function show(req, res) {
  return Division.findById(req.params.id)
    .populate('department').exec()
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Division in the DB
export function create(req, res) {
  return Division.create(req.body)
    .catch(handleError(res))
    .then(division => Division.populate(division,  [
      'department'
    ]))
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Division in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Division.findById(req.params.id).exec()
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .catch(handleError(res))
    .then(division => Division.populate(division,  [
      'department'
    ]))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Division from the DB
export function destroy(req, res) {
  return Division.findById(req.params.id).exec()
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
    .then(saveUpdates({ active: false }))
    .then(respondWithResult(res, 204))
    .catch(handleError(res));
}

// Gets a list of Divisions of a Department
export function byDepartment(req, res) {
  return Division.find({
      department: req.params.id,
      active: true
    }).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}
