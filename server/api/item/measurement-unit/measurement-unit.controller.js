/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/measurement-units              ->  index
 * POST    /api/measurement-units              ->  create
 * GET     /api/measurement-units/:id          ->  show
 * PUT     /api/measurement-units/:id          ->  update
 * DELETE  /api/measurement-units/:id          ->  destroy
 */

'use strict';

import MeasurementUnit from './measurement-unit.model';
import * as helper from '../../../components/helper';

// Gets a list of MeasurementUnits
export function index(req, res) {
  return MeasurementUnit.find({active: true}).exec()
    .then(helper.respondWithResult(res))
    .catch(helper.handleError(res));
}

// Gets a single MeasurementUnit from the DB
export function show(req, res) {
  return MeasurementUnit.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.respondWithResult(res));
}

// Creates a new MeasurementUnit in the DB
export function create(req, res) {
  return MeasurementUnit.create(req.body)
    .then(helper.respondWithResult(res, 201))
    .catch(helper.validationError(res));
}

// Updates an existing MeasurementUnit in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return MeasurementUnit.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.saveUpdates(req.body))
    .then(helper.respondWithResult(res))
    .catch(helper.validationError(res));
}

// Deletes a MeasurementUnit from the DB
export function destroy(req, res) {
  return MeasurementUnit.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.saveUpdates({ active: false }))
    .then(helper.respondWithResult(res, 204))
    .catch(helper.handleError(res));
}
