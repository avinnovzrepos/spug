/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/receiving              ->  index
 * POST    /api/receiving/:id          ->  create
 * GET     /api/receiving/:id          ->  show
 * PUT     /api/receiving/:id          ->  update
 * DELETE  /api/receiving/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Receiving from './receiving.model';
import PurchaseOrder from '../purchase-order/purchase-order.model';
import * as helper from '../../components/helper';

// Gets a list of Receiving
export function index(req, res) {
  return Receiving.find({active: true})
    .populate([
      { path: 'receivedBy', select: 'lastName firstName email role plant' },
      'purchaseOrder',
      'request',
      'items.item'
    ])
    .sort("-createdAt").exec()
    .then(helper.respondWithResult(res))
    .catch(helper.handleError(res));
}

// Gets a single Receiving from the DB
export function show(req, res) {
  return Receiving.findById(req.params.id)
    .populate([
      { path: 'receivedBy', select: 'lastName firstName email role plant' },
      'purchaseOrder',
      'request',
      'items.item'
    ]).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.respondWithResult(res));
}

// Creates a new Receiving in the DB
export function create(req, res) {
  req.body.receivedBy = req.user;
  if (req.params.purchaseOrderId) {
    req.body.purchaseOrder = req.params.purchaseOrderId;
  } else if (req.params.requestId) {
    req.body.request = req.params.requestId;
  }
  return Receiving.create(req.body)
    .catch(helper.validationError(res))
    .then(receiving => {
      receiving.purchaseOrder = receiving.purchaseOrder._id;
      return Receiving.populate(receiving, [
        { path: 'receivedBy', select: 'lastName firstName email role plant' },
        'purchaseOrder',
        'request',
        'items.item'
      ]);
    })
    .then(helper.respondWithResult(res, 201))
    .catch(helper.handleError(res));
}

// Updates an existing Receiving in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Receiving.findById(req.params.id)
    .populate("receivedBy") // this line is required
    .exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.saveUpdates(req.body))
    .catch(helper.validationError(res))
    .then(receiving => Receiving.populate(receiving, [
      { path: 'receivedBy', select: 'lastName firstName email role plant' },
      'purchaseOrder',
      'request',
      'items.item'
    ]))
    .then(helper.respondWithResult(res))
    .catch(helper.handleError(res));
}

// Deletes a Receiving from the DB
export function destroy(req, res) {
  return Receiving.findById(req.params.id)
    .populate("receivedBy") // this is required
    .exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.saveUpdates({ active: false }))
    .then(helper.respondWithResult(res, 204))
    .catch(helper.handleError(res));
}


// Gets a list of Receiving by Plant
export function plant(req, res) {
  console.log(req.params)
  return PurchaseOrder.find({
      plant: req.params.id,
      status: 'received',
      active: true
    }).exec()
    .then(function(purchaseOrders) {
      console.log(purchaseOrders)
      return Receiving.find({
          purchaseOrder: {
            $in: purchaseOrders.map((po) => po._id)
          },
          active: true
        })
        .populate([
          { path: 'receivedBy', select: 'lastName firstName email role plant' },
          'purchaseOrder',
          'request',
          'items.item'
        ])
        .sort("-createdAt").exec();
    })
    .then(helper.respondWithResult(res))
    .catch(helper.handleError(res));
}


// Gets a list of Receiving by User
export function user(req, res) {
  return Receiving.find({
      receivedBy: req.params.id,
      active: true
    })
    .populate([
      { path: 'receivedBy', select: 'lastName firstName email role plant' },
      'purchaseOrder',
      'request',
      'items.item'
    ])
    .sort("-createdAt").exec()
    .then(helper.respondWithResult(res))
    .catch(helper.handleError(res));
}
