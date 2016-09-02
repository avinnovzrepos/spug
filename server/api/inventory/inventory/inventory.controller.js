/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/inventory              ->  index
 * POST    /api/inventory              ->  create
 * GET     /api/inventory/:id          ->  show
 * PUT     /api/inventory/:id          ->  update
 * DELETE  /api/inventory/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Inventory from './inventory.model';
import Plant from '../../plant/plant.model';
import * as helper from '../../../components/helper';

// Gets a list of Inventorys
export function index(req, res) {
  return Inventory.find({
      active: true,
      _id: {
        $nin: req.query.exclude ? req.query.exclude.split(',') : []
      }
    })
    .populate([
      'plant',
      'item',
      { path:'createdBy', select:'name email' },
      { path:'lastUpdatedBy', select:'name email' }
    ])
    .exec()
    .then(helper.respondWithResult(res))
    .catch(helper.handleError(res));
}

// Gets a single Inventory from the DB
export function show(req, res) {
  return Inventory.findById(req.params.id)
    .populate([
      'plant',
      'item',
      { path:'createdBy', select:'name email' },
      { path:'lastUpdatedBy', select:'name email' }
    ])
    .exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.respondWithResult(res));
}

// Creates a new Inventory in the DB
export function create(req, res) {
  req.body.createdBy = req.user._id;
  req.body.plant = req.user.role === "superadmin" ? req.body.plant : req.user.plant;
  return Inventory.create(req.body)
    .catch(helper.validationError(res))
    .then(inventory => Inventory.populate(inventory, [
      'plant',
      'item',
      { path:'createdBy', select:'name email' },
      { path:'lastUpdatedBy', select:'name email' }
    ]))
    .then(helper.respondWithResult(res, 201))
    .catch(helper.handleError(res));
}

// Updates an existing Inventory in the DB
export function update(req, res) {
  req.body.lastUpdatedBy = req.user._id;
  if (req.body._id) {
    delete req.body._id;
  }
  req.body.plant = req.user.role === "superadmin" ? req.body.plant : req.user.plant;
  return Inventory.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.saveUpdates(req.body))
    .catch(helper.validationError(res))
    .then(inventory => Inventory.populate(inventory, [
      'plant',
      'item',
      { path:'createdBy', select:'name email' },
      { path:'lastUpdatedBy', select:'name email' }
    ]))
    .then(helper.respondWithResult(res))
    .catch(helper.handleError(res));
}

// Deletes a Inventory from the DB
export function destroy(req, res) {
  return Inventory.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.saveUpdates({ active: false }))
    .then(helper.respondWithResult(res, 204))
    .catch(helper.handleError(res));
}

// Gets list of Inventory by plant
export function plant(req, res) {
  Inventory.find({
    plant: req.params.id
  }).populate([
    'plant',
    'item',
    { path:'createdBy', select:'name email' },
    { path:'lastUpdatedBy', select:'name email' }
  ]).exec()
  .catch(helper.handleError(plant))
  .then(helper.handleEntityNotFound(res))
  .then(helper.respondWithResult(res));
}
