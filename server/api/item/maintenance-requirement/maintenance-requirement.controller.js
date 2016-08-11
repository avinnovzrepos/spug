/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/maintenance-requirements              ->  index
 * POST    /api/maintenance-requirements              ->  create
 * GET     /api/maintenance-requirements/:id          ->  show
 * PUT     /api/maintenance-requirements/:id          ->  update
 * DELETE  /api/maintenance-requirements/:id          ->  destroy
 */

'use strict';

import MaintenanceRequirement from './maintenance-requirement.model';
import * as helper from '../../../components/helper';

// Gets a list of MaintenanceRequirements
export function index(req, res) {
  return MaintenanceRequirement.find({active: true}).exec()
    .then(helper.respondWithResult(res))
    .catch(helper.handleError(res));
}

// Gets a single MaintenanceRequirement from the DB
export function show(req, res) {
  return MaintenanceRequirement.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.respondWithResult(res));
}

// Creates a new MaintenanceRequirement in the DB
export function create(req, res) {
  return MaintenanceRequirement.create(req.body)
    .then(helper.respondWithResult(res, 201))
    .catch(helper.validationError(res));
}

// Updates an existing MaintenanceRequirement in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return MaintenanceRequirement.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.saveUpdates(req.body))
    .then(helper.respondWithResult(res))
    .catch(helper.validationError(res));
}

// Deletes a MaintenanceRequirement from the DB
export function destroy(req, res) {
  return MaintenanceRequirement.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.saveUpdates({ active: false }))
    .then(helper.respondWithResult(res, 204))
    .catch(helper.handleError(res));
}
