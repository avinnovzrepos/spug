/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/purchaseOrders              ->  index
 * POST    /api/purchaseOrders              ->  create
 * GET     /api/purchaseOrders/:id          ->  show
 * PUT     /api/purchaseOrders/:id          ->  update
 * DELETE  /api/purchaseOrders/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import PurchaseOrder from './purchase-order.model';
import * as helper from '../../components/helper';

// Gets a list of PurchaseOrders
export function index(req, res) {
  var query = {active: true};
  if (req.query.status) {
    query.status = { $in: req.query.status.split(',') };
  }
  if (req.query.type) {
    query.requestType = req.query.type;
  }
  return PurchaseOrder.find(query)
    .populate([
      'plant',
      'items.item',
      {
        path: 'createdBy',
        select: 'email lastName firstName'
      }
    ])
    .exec()
    .then(helper.respondWithResult(res))
    .catch(helper.handleError(res));
}

// Gets a single PurchaseOrder from the DB
export function show(req, res) {
  return PurchaseOrder.findById(req.params.id)
    .populate([
      'plant',
      'items.item',
      {
        path: 'createdBy',
        select: 'email lastName firstName'
      }
    ])
    .exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.respondWithResult(res));
}

// Creates a new PurchaseOrder in the DB
export function create(req, res) {
  req.body.createdBy = req.user;
  req.body.plant = req.user.role === 'superadmin' ? req.body.plant : req.user.plant;
  return PurchaseOrder.create(req.body)
    .catch(helper.validationError(res))
    .then(purchaseOrder => PurchaseOrder.populate(purchaseOrder, [
      'plant',
      'items.item',
      {
        path: 'createdBy',
        select: 'email lastName firstName'
      }
    ]))
    .then(helper.respondWithResult(res, 201))
    .catch(helper.handleError(res));
}

// Updates an existing PurchaseOrder in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return PurchaseOrder.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.saveUpdates(req.body))
    .catch(helper.validationError(res))
    .then(purchaseOrder => PurchaseOrder.populate(purchaseOrder, [
      'plant',
      'items.item',
      {
        path: 'createdBy',
        select: 'email lastName firstName'
      }
    ]))
    .then(helper.respondWithResult(res))
    .catch(helper.handleError(res));
}

// Deletes a PurchaseOrder from the DB
export function destroy(req, res) {
  return PurchaseOrder.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.saveUpdates({ active: false }))
    .then(helper.respondWithResult(res, 204))
    .catch(helper.handleError(res));
}

// Gets a list of PurchaseOrders of a specific user
export function user(req, res) {
  var query = {
    createdBy: req.params.id,
    active: true
  };
  if (req.query.status) {
    query.status = { $in: req.query.status.split(',') };
  }
  if (req.query.type) {
    query.requestType = req.query.type;
  }
  return PurchaseOrder.find(query)
    .populate([
      'plant',
      'items.item',
      {
        path: 'createdBy',
        select: 'email lastName firstName'
      }
    ])
    .sort("-createdAt").exec()
    .then(helper.respondWithResult(res))
    .catch(helper.handleError(res));
}

// Gets a list of PurchaseOrders of a specific plant
export function plant(req, res) {
  var query = {
    plant: req.params.id,
    active: true
  };
  if (req.query.status) {
    query.status = { $in: req.query.status.split(',') };
  }
  if (req.query.type) {
    query.requestType = req.query.type;
  }
  return PurchaseOrder.find(query)
    .populate([
      { path: 'createdBy', select: 'name email role plant' },
      'plant',
      'items.item'
    ])
    .sort("-createdAt").exec()
    .then(helper.respondWithResult(res))
    .catch(helper.handleError(res));
}

// Declines a PurchaseOrder
export function decline(req, res) {
  return PurchaseOrder.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.saveUpdates({ status: 'declined' }))
    .then(purchaseOrder => PurchaseOrder.populate(purchaseOrder, [
      { path: 'createdBy', select: 'name email role plant' },
      'plant',
      'items.item'
    ]))
    .then(helper.respondWithResult(res))
    .catch(helper.handleError(res));
}
