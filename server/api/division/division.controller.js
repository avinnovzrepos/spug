/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/divisions              ->  index
 * POST    /api/divisions              ->  create
 * GET     /api/divisions/:id          ->  show
 * PUT     /api/divisions/:id          ->  update
 * DELETE  /api/divisions/:id          ->  destroy
 */

'use strict';

import Division from './division.model';
import * as helper from '../../components/helper';

// Gets a list of Divisions
export function index(req, res) {
  return Division.find({active: true})
    .populate('department').exec()
    .then(helper.respondWithResult(res))
    .catch(helper.handleError(res));
}

// Gets a single Division from the DB
export function show(req, res) {
  return Division.findById(req.params.id)
    .populate('department').exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.respondWithResult(res));
}

// Creates a new Division in the DB
export function create(req, res) {
  return Division.create(req.body)
    .catch(helper.validationError(res))
    .then(division => Division.populate(division, 'department'))
    .then(helper.respondWithResult(res, 201))
    .catch(helper.handleError(res));
}

// Updates an existing Division in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Division.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.saveUpdates(req.body))
    .catch(helper.validationError(res))
    .then(division => Division.populate(division, 'department'))
    .then(helper.respondWithResult(res))
    .catch(helper.handleError(res));
}

// Deletes a Division from the DB
export function destroy(req, res) {
  return Division.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.saveUpdates({ active: false }))
    .then(helper.respondWithResult(res, 204))
    .catch(helper.handleError(res));
}

// Gets a list of Divisions of a Department
export function byDepartment(req, res) {
  return Division.find({
      department: req.params.id,
      active: true
    }).exec()
    .then(helper.respondWithResult(res))
    .catch(helper.handleError(res));
}
