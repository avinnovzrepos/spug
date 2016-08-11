/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/classifications              ->  index
 * POST    /api/classifications              ->  create
 * GET     /api/classifications/:id          ->  show
 * PUT     /api/classifications/:id          ->  update
 * DELETE  /api/classifications/:id          ->  destroy
 */

'use strict';

import Classification from './classification.model';
import * as helper from '../../../components/helper';

// Gets a list of Classifications
export function index(req, res) {
  return Classification.find({active: true}).exec()
    .then(helper.respondWithResult(res))
    .catch(helper.handleError(res));
}

// Gets a single Classification from the DB
export function show(req, res) {
  return Classification.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.respondWithResult(res));
}

// Creates a new Classification in the DB
export function create(req, res) {
  return Classification.create(req.body)
    .then(helper.respondWithResult(res, 201))
    .catch(helper.validationError(res));
}

// Updates an existing Classification in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Classification.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.saveUpdates(req.body))
    .then(helper.respondWithResult(res))
    .catch(helper.validationError(res));
}

// Deletes a Classification from the DB
export function destroy(req, res) {
  return Classification.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.saveUpdates({ active: false }))
    .then(helper.respondWithResult(res, 204))
    .catch(helper.handleError(res));
}
