/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/inventory-history              ->  index
 * POST    /api/inventory-history              ->  create
 * GET     /api/inventory-history/:id          ->  show
 * PUT     /api/inventory-history/:id          ->  update
 * DELETE  /api/inventory-history/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import InventoryHistory from './inventory-history.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of InventoryHistorys
export function index(req, res) {
  return InventoryHistory.find({})
    .populate("inventory")
    .populate('user', 'name email')
    .sort("-createdAt")
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single InventoryHistory from the DB
export function show(req, res) {
  return InventoryHistory.findById(req.params.id)
    .populate("user inventory").exec()
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a InventoryHistory by Inventory
export function byInventory(req, res) {
  return InventoryHistory.find({ inventory: req.params.inventoryId })
    .populate("inventory")
    .populate('user', 'name email').sort("-createdAt").exec()
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}
