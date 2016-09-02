/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/components              ->  index
 * POST    /api/components              ->  create
 * GET     /api/components/:id          ->  show
 * PUT     /api/components/:id          ->  update
 * DELETE  /api/components/:id          ->  destroy
 */

'use strict';

import Component from './component.model';
import * as helper from '../../../components/helper';

// Gets a list of Components
export function index(req, res) {
  return Component.find({active: true}).exec()
    .then(helper.respondWithResult(res))
    .catch(helper.handleError(res));
}

// Gets a single Component from the DB
export function show(req, res) {
  return Component.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.respondWithResult(res));
}

// Creates a new Component in the DB
export function create(req, res) {
  return Component.create(req.body)
    .then(helper.respondWithResult(res, 201))
    .catch(helper.validationError(res));
}

// Updates an existing Component in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Component.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.saveUpdates(req.body))
    .then(helper.respondWithResult(res))
    .catch(helper.validationError(res));
}

// Deletes a Component from the DB
export function destroy(req, res) {
  return Component.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.saveUpdates({ active: false }))
    .then(helper.respondWithResult(res, 204))
    .catch(helper.handleError(res));
}
