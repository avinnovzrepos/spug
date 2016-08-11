/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/departments              ->  index
 * POST    /api/departments              ->  create
 * GET     /api/departments/:id          ->  show
 * PUT     /api/departments/:id          ->  update
 * DELETE  /api/departments/:id          ->  destroy
 */

'use strict';

import Department from './department.model';
import * as helper from '../../components/helper';

// Gets a list of Departments
export function index(req, res) {
  return Department.find({active: true}).exec()
    .then(helper.respondWithResult(res))
    .catch(helper.handleError(res));
}

// Gets a single Department from the DB
export function show(req, res) {
  return Department.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.respondWithResult(res));
}

// Creates a new Department in the DB
export function create(req, res) {
  return Department.create(req.body)
    .then(helper.respondWithResult(res, 201))
    .catch(helper.validationError(res));
}

// Updates an existing Department in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Department.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.saveUpdates(req.body))
    .then(helper.respondWithResult(res))
    .catch(helper.validationError(res));
}

// Deletes a Department from the DB
export function destroy(req, res) {
  return Department.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.saveUpdates({ active: false }))
    .then(helper.respondWithResult(res, 204))
    .catch(helper.handleError(res));
}
