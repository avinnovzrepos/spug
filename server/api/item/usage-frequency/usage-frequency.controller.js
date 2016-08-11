/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/usage-frequency              ->  index
 * POST    /api/usage-frequency              ->  create
 * GET     /api/usage-frequency/:id          ->  show
 * PUT     /api/usage-frequency/:id          ->  update
 * DELETE  /api/usage-frequency/:id          ->  destroy
 */

'use strict';

import UsageFrequency from './usage-frequency.model';
import * as helper from '../../../components/helper';

// Gets a list of UsageFrequency
export function index(req, res) {
  return UsageFrequency.find({active: true}).exec()
    .then(helper.respondWithResult(res))
    .catch(helper.handleError(res));
}

// Gets a single UsageFrequency from the DB
export function show(req, res) {
  return UsageFrequency.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.respondWithResult(res));
}

// Creates a new UsageFrequency in the DB
export function create(req, res) {
  return UsageFrequency.create(req.body)
    .then(helper.respondWithResult(res, 201))
    .catch(helper.validationError(res));
}

// Updates an existing UsageFrequency in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return UsageFrequency.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.saveUpdates(req.body))
    .then(helper.respondWithResult(res))
    .catch(helper.validationError(res));
}

// Deletes a UsageFrequency from the DB
export function destroy(req, res) {
  return UsageFrequency.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.saveUpdates({ active: false }))
    .then(helper.respondWithResult(res, 204))
    .catch(helper.handleError(res));
}
