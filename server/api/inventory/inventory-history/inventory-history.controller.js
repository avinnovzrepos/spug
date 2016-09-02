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
import * as helper from '../../../components/helper';

// Gets a list of InventoryHistorys
export function index(req, res) {
  return InventoryHistory.find({})
    .populate([
      'inventory',
      {
        path: 'inventory',
        populate: {
          path: 'createdBy',
          model: 'User',
          select:'lastName firstName email'
        }
      },
      {
        path: 'inventory',
        populate: {
          path: 'lastUpdatedBy',
          model: 'User',
          select:'lastName firstName email'
        }
      },
      { path:'user', select:'lastName firstName email' }
    ])
    .sort("-createdAt")
    .then(helper.respondWithResult(res))
    .catch(helper.handleError(res));
}

// Gets a single InventoryHistory from the DB
export function show(req, res) {
  return InventoryHistory.findById(req.params.id)
    .populate([
      'inventory',
      {
        path: 'inventory',
        populate: {
          path: 'createdBy',
          model: 'User',
          select:'lastName firstName email'
        }
      },
      {
        path: 'inventory',
        populate: {
          path: 'lastUpdatedBy',
          model: 'User',
          select:'lastName firstName email'
        }
      },
      { path:'user', select:'lastName firstName email' }
    ]).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.respondWithResult(res))
    .catch(helper.handleError(res));
}

// Gets a InventoryHistory by Inventory
export function inventory(req, res) {
  return InventoryHistory.find({ inventory: req.params.id })
    .populate([
      'inventory',
      {
        path: 'inventory',
        populate: {
          path: 'createdBy',
          model: 'User',
          select:'lastName firstName email'
        }
      },
      {
        path: 'inventory',
        populate: {
          path: 'lastUpdatedBy',
          model: 'User',
          select:'lastName firstName email'
        }
      },
      { path:'user', select:'lastName firstName email' }
    ])
    .sort("-createdAt").exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.respondWithResult(res))
    .catch(helper.handleError(res));
}
