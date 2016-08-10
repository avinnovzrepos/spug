/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/measurement-units              ->  index
 * POST    /api/measurement-units              ->  create
 * GET     /api/measurement-units/:id          ->  show
 * PUT     /api/measurement-units/:id          ->  update
 * DELETE  /api/measurement-units/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import MeasurementUnit from './measurement-unit.model';

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

// Gets a list of MeasurementUnits
export function index(req, res) {
  return MeasurementUnit.find({active: true}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single MeasurementUnit from the DB
export function show(req, res) {
  return MeasurementUnit.findById(req.params.id).exec()
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new MeasurementUnit in the DB
export function create(req, res) {
  return MeasurementUnit.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing MeasurementUnit in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return MeasurementUnit.findById(req.params.id).exec()
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a MeasurementUnit from the DB
export function destroy(req, res) {
  return MeasurementUnit.findById(req.params.id).exec()
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
    .then(saveUpdates({ active: false }))
    .then(respondWithResult(res, 204))
    .catch(handleError(res));
}
