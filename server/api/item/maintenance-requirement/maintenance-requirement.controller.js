/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/maintenance-requirements              ->  index
 * POST    /api/maintenance-requirements              ->  create
 * GET     /api/maintenance-requirements/:id          ->  show
 * PUT     /api/maintenance-requirements/:id          ->  update
 * DELETE  /api/maintenance-requirements/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import MaintenanceRequirement from './maintenance-requirement.model';

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

// Gets a list of MaintenanceRequirements
export function index(req, res) {
  return MaintenanceRequirement.find({active: true}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single MaintenanceRequirement from the DB
export function show(req, res) {
  return MaintenanceRequirement.findById(req.params.id).exec()
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new MaintenanceRequirement in the DB
export function create(req, res) {
  return MaintenanceRequirement.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing MaintenanceRequirement in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return MaintenanceRequirement.findById(req.params.id).exec()
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a MaintenanceRequirement from the DB
export function destroy(req, res) {
  return MaintenanceRequirement.findById(req.params.id).exec()
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
    .then(saveUpdates({ active: false }))
    .then(respondWithResult(res, 204))
    .catch(handleError(res));
}
