/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/disciplines              ->  index
 * POST    /api/disciplines              ->  create
 * GET     /api/disciplines/:id          ->  show
 * PUT     /api/disciplines/:id          ->  update
 * DELETE  /api/disciplines/:id          ->  destroy
 */

'use strict';

import Discipline from './discipline.model';
import * as helper from '../../../components/helper';

// Gets a list of Disciplines
export function index(req, res) {
  return Discipline.find({active: true}).exec()
    .then(helper.respondWithResult(res))
    .catch(helper.handleError(res));
}

// Gets a single Discipline from the DB
export function show(req, res) {
  return Discipline.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.respondWithResult(res));
}

// Creates a new Discipline in the DB
export function create(req, res) {
  return Discipline.create(req.body)
    .then(helper.respondWithResult(res, 201))
    .catch(helper.validationError(res));
}

// Updates an existing Discipline in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Discipline.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.saveUpdates(req.body))
    .then(helper.respondWithResult(res))
    .catch(helper.validationError(res));
}

// Deletes a Discipline from the DB
export function destroy(req, res) {
  return Discipline.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.saveUpdates({ active: false }))
    .then(helper.respondWithResult(res, 204))
    .catch(helper.handleError(res));
}
