/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/gensets              ->  index
 * POST    /api/gensets              ->  create
 * GET     /api/gensets/:id          ->  show
 * PUT     /api/gensets/:id          ->  update
 * DELETE  /api/gensets/:id          ->  destroy
 */

'use strict';

import Genset from './genset.model';
import * as helper from '../../../components/helper';

// Gets a list of Gensets
export function index(req, res) {
  return Genset.find({active: true}).exec()
    .then(helper.respondWithResult(res))
    .catch(helper.handleError(res));
}

// Gets a single Genset from the DB
export function show(req, res) {
  return Genset.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.respondWithResult(res));
}

// Creates a new Genset in the DB
export function create(req, res) {
  return Genset.create(req.body)
    .then(helper.respondWithResult(res, 201))
    .catch(helper.validationError(res));
}

// Updates an existing Genset in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Genset.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.saveUpdates(req.body))
    .then(helper.respondWithResult(res))
    .catch(helper.validationError(res));
}

// Deletes a Genset from the DB
export function destroy(req, res) {
  return Genset.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.saveUpdates({ active: false }))
    .then(helper.respondWithResult(res, 204))
    .catch(helper.handleError(res));
}
