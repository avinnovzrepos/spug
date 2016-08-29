/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/items              ->  index
 * POST    /api/items              ->  create
 * GET     /api/items/:id          ->  show
 * PUT     /api/items/:id          ->  update
 * DELETE  /api/items/:id          ->  destroy
 */

'use strict';

import Item from './item.model';
import * as helper from '../../../components/helper';

// Gets a list of Items
export function index(req, res) {
  return Item.find({active: true})
    .populate([
      'classification',
      'measurementUnit',
      'storageLevel',
      'usageFrequency',
      'maintenanceRequirement',
      'discipline',
      'component',
      'gensetMake'
    ]).exec()
    .then(helper.respondWithResult(res))
    .catch(helper.handleError(res));
}

// Gets a single Item from the DB
export function show(req, res) {
  return Item.findById(req.params.id)
    .populate([
      'classification',
      'measurementUnit',
      'storageLevel',
      'usageFrequency',
      'maintenanceRequirement',
      'discipline',
      'component',
      'gensetMake'
    ]).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.respondWithResult(res));
}

// Creates a new Item in the DB
export function create(req, res) {
  return Item.create(req.body)
    .catch(helper.validationError(res))
    .then(item => Item.populate(item, [
      'classification',
      'measurementUnit',
      'storageLevel',
      'usageFrequency',
      'maintenanceRequirement',
      'discipline',
      'component',
      'gensetMake'
    ]))
    .then(helper.respondWithResult(res))
    .catch(helper.handleError(res));
}

// Updates an existing Item in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Item.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.saveUpdates(req.body))
    .catch(helper.validationError(res))
    .then(item => Item.populate(item, [
      'classification',
      'measurementUnit',
      'storageLevel',
      'usageFrequency',
      'maintenanceRequirement',
      'discipline',
      'component',
      'gensetMake'
    ]))
    .then(helper.respondWithResult(res))
    .catch(helper.handleError(res));
}

// Deletes a Item from the DB
export function destroy(req, res) {
  return Item.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.saveUpdates({ active: false }))
    .then(helper.respondWithResult(res, 204))
    .catch(helper.handleError(res));
}

// Get Item by Classification
export function classification(req, res) {
  return Item.find({
      classification: req.params.id
    })
    .populate([
      'classification',
      'measurementUnit',
      'storageLevel',
      'usageFrequency',
      'maintenanceRequirement',
      'discipline',
      'component',
      'gensetMake'
    ]).exec()
    .catch(helper.handleError(res))
    .then(helper.respondWithResult(res));
}

// Get Item by measurementUnit
export function measurementUnit(req, res) {
  return Item.find({
      measurementUnit: req.params.id
    })
    .populate([
      'classification',
      'measurementUnit',
      'storageLevel',
      'usageFrequency',
      'maintenanceRequirement',
      'discipline',
      'component',
      'gensetMake'
    ]).exec()
    .catch(helper.handleError(res))
    .then(helper.respondWithResult(res));
}

// Get Item by storageLevel
export function storageLevel(req, res) {
  return Item.find({
      storageLevel: req.params.id
    })
    .populate([
      'classification',
      'measurementUnit',
      'storageLevel',
      'usageFrequency',
      'maintenanceRequirement',
      'discipline',
      'component',
      'gensetMake'
    ]).exec()
    .catch(helper.handleError(res))
    .then(helper.respondWithResult(res));
}

// Get Item by usageFrequency
export function usageFrequency(req, res) {
  return Item.find({
      usageFrequency: req.params.id
    })
    .populate([
      'classification',
      'measurementUnit',
      'storageLevel',
      'usageFrequency',
      'maintenanceRequirement',
      'discipline',
      'component',
      'gensetMake'
    ]).exec()
    .catch(helper.handleError(res))
    .then(helper.respondWithResult(res));
}

// Get Item by maintenanceRequirement
export function maintenanceRequirement(req, res) {
  return Item.find({
      maintenanceRequirement: req.params.id
    })
    .populate([
      'classification',
      'measurementUnit',
      'storageLevel',
      'usageFrequency',
      'maintenanceRequirement',
      'discipline',
      'component',
      'gensetMake'
    ]).exec()
    .catch(helper.handleError(res))
    .then(helper.respondWithResult(res));
}

// Get Item by discipline
export function discipline(req, res) {
  return Item.find({
      discipline: req.params.id
    })
    .populate([
      'classification',
      'measurementUnit',
      'storageLevel',
      'usageFrequency',
      'maintenanceRequirement',
      'discipline',
      'component',
      'gensetMake'
    ]).exec()
    .catch(helper.handleError(res))
    .then(helper.respondWithResult(res));
}
