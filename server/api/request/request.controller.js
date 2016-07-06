/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/requests              ->  index
 * POST    /api/requests              ->  create
 * GET     /api/requests/:id          ->  show
 * PUT     /api/requests/:id          ->  update
 * DELETE  /api/requests/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Request from './request.model';
import Item from '../item/item.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    if (!entity) {
      return null;
    }
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
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
    res.status(statusCode).send(err && err.toString ? { message: err.toString() } : err);
  };
}

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

// Gets a list of Requests
export function index(req, res) {
  var query = {active: true};
  if (req.query.status) {
    query.status = { $in: req.query.status.split(',') };
  }
  return Request.find(query)
    .populate([
      { path: 'createdBy', select: 'name email role plant' },
      { path: 'approvedBy', select: 'name email role plant' },
      'plant',
      'items.item',
      'source',
      'destination'
    ])
    .sort("-createdAt").exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Request from the DB
export function show(req, res) {
  return Request.findById(req.params.id).populate([
      { path: 'createdBy', select: 'name email role plant' },
      { path: 'approvedBy', select: 'name email role plant' },
      'plant',
      'items.item',
      'source',
      'destination'
    ]).exec()
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Request in the DB
export function create(req, res) {
  req.body.createdBy = req.user;
  req.body.destination = req.user.role === 'superadmin' ? req.body.destination : req.user.plant;
  if (req.body.destination && req.body.source && req.body.destination == req.body.source) {
    res.status(400).send({ message: 'Source and destination cannot be the same' });
  }
  return Request.create(req.body)
    .catch(validationError(res))
    .then(request => Request.populate(request, [
      { path: 'createdBy', select: 'name email role plant' },
      { path: 'approvedBy', select: 'name email role plant' },
      'plant',
      'items.item',
      'source',
      'destination']
    ))
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Request in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Request.findById(req.params.id).exec()
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .catch(validationError(res))
    .then(request => Request.populate(request, [
      { path: 'createdBy', select: 'name email role plant' },
      { path: 'approvedBy', select: 'name email role plant' },
      'plant',
      'items.item',
      'source',
      'destination'
    ]))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Request from the DB
export function destroy(req, res) {
  return Request.findById(req.params.id).exec()
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
    .then(saveUpdates({ active: false }))
    .then(respondWithResult(res, 204))
    .catch(handleError(res));
}

// Gets a list of Requests of a specific user
export function byUser(req, res) {
  var query = {
    createdBy: req.params.id,
    active: true
  };
  if (req.query.status) {
    query.status = { $in: req.query.status.split(',') };
  }
  return Request.find(query)
    .populate([
      { path: 'createdBy', select: 'name email role plant' },
      { path: 'approvedBy', select: 'name email role plant' },
      'plant',
      'items.item',
      'source',
      'destination'
    ])
    .sort("-createdAt").exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Declines a Request
export function decline(req, res) {
  return Request.findById(req.params.id).exec()
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
    .then(request => {
      if (!request) return null;
      if (request.source.toString() !== req.user.plant.toString() && req.user.role != 'superadmin') {
        res.status(401).send();
        return null;
      }
      return request;
    })
    .then(saveUpdates({ status: 'declined', approvedBy: req.user }))
    .then(request => Request.populate(request, [
      { path: 'createdBy', select: 'name email role plant' },
      { path: 'approvedBy', select: 'name email role plant' },
      'plant',
      'items.item',
      'source',
      'destination'
    ]))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Approves a Request
export function approve(req, res) {
  return Request.findById(req.params.id).exec()
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
    .then(request => {
      if (!request) return null;
      if (request.source.toString() !== req.user.plant.toString() && req.user.role != 'superadmin') {
        res.status(401).send();
        return null;
      }
      return request;
    })
    .then(saveUpdates({ status: 'approved', approvedBy: req.user }))
    .catch(handleError(res, 400))
    .then(request => Request.populate(request, [
      { path: 'createdBy', select: 'name email role plant' },
      { path: 'approvedBy', select: 'name email role plant' },
      'plant',
      'items.item',
      'source',
      'destination'
    ]))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Requests to a specific plant
export function toPlant(req, res) {
  var query = {
    active: true,
    source: req.params.id
  };
  if (req.query.status) {
    query.status = { $in: req.query.status.split(',') };
  }
  return Request.find(query)
    .populate([
      { path: 'createdBy', select: 'name email role plant' },
      { path: 'approvedBy', select: 'name email role plant' },
      'plant',
      'items.item',
      'source',
      'destination'
    ])
    .sort("-createdAt").exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Requests sent by a specific plant
export function ofPlant(req, res) {
  var query = {
    active: true,
    destination: req.params.id
  };
  if (req.query.status) {
    query.status = { $in: req.query.status.split(',') };
  }
  return Request.find(query)
    .populate([
      { path: 'createdBy', select: 'name email role plant' },
      { path: 'approvedBy', select: 'name email role plant' },
      'plant',
      'items.item',
      'source',
      'destination'
    ])
    .sort("-createdAt").exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

