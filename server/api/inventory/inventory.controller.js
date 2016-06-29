/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/inventory              ->  index
 * POST    /api/inventory              ->  create
 * GET     /api/inventory/:id          ->  show
 * PUT     /api/inventory/:id          ->  update
 * DELETE  /api/inventory/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Inventory from './inventory.model';

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

// Gets a list of Inventorys
export function index(req, res) {
  return Inventory.find({active: true})
    .populate("plant", "_id name description")
    .populate("item", "_id code name unitOfMeasurement").exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Inventory from the DB
export function show(req, res) {
  return Inventory.findById(req.params.id)
    .populate("plant item").exec()
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Inventory in the DB
export function create(req, res) {
  return Inventory.create(req.body)
    .then(inventory => Inventory.populate(inventory, "plant item"))
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Inventory in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Inventory.findById(req.params.id).exec()
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(inventory => Inventory.populate(inventory, "plant item"))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Inventory from the DB
export function destroy(req, res) {
  return Inventory.findById(req.params.id).exec()
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
    .then(saveUpdates({ active: false }))
    .then(respondWithResult(res, 204))
    .catch(handleError(res));
}
