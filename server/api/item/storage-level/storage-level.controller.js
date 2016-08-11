/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/storage-levels              ->  index
 * POST    /api/storage-levels              ->  create
 * GET     /api/storage-levels/:id          ->  show
 * PUT     /api/storage-levels/:id          ->  update
 * DELETE  /api/storage-levels/:id          ->  destroy
 */

'use strict';

import StorageLevel from './storage-level.model';
import * as helper from '../../../components/helper';

// Gets a list of StorageLevels
export function index(req, res) {
  return StorageLevel.find({active: true}).exec()
    .then(helper.respondWithResult(res))
    .catch(helper.handleError(res));
}

// Gets a single StorageLevel from the DB
export function show(req, res) {
  return StorageLevel.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.respondWithResult(res));
}

// Creates a new StorageLevel in the DB
export function create(req, res) {
  return StorageLevel.create(req.body)
    .then(helper.respondWithResult(res, 201))
    .catch(helper.validationError(res));
}

// Updates an existing StorageLevel in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return StorageLevel.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.saveUpdates(req.body))
    .then(helper.respondWithResult(res))
    .catch(helper.validationError(res));
}

// Deletes a StorageLevel from the DB
export function destroy(req, res) {
  return StorageLevel.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.saveUpdates({ active: false }))
    .then(helper.respondWithResult(res, 204))
    .catch(helper.handleError(res));
}
