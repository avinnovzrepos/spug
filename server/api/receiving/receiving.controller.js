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
    res.status(statusCode).send(err);
  };
}

// Gets a list of Receiving
export function index(req, res) {
  return Receiving.find({active: true})
    .populate([
      { path: 'receivedBy', select: 'name email role plant' },
      'request',
      'items.item'
    ])
    .sort("-createdAt").exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Receiving from the DB
export function show(req, res) {
  return Receiving.findById(req.params.id)
    .populate([
      { path: 'receivedBy', select: 'name email role plant' },
      'request',
      'items.item'
    ]).exec()
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Receiving in the DB
export function create(req, res) {
  req.body.receivedBy = req.user;
  req.body.request = req.params.id;
  return Receiving.create(req.body)
    .catch(handleError(res))
    .then(receiving => Receiving.populate(receiving, [
      { path: 'receivedBy', select: 'name email role plant' },
      'request',
      'items.item']
    ))
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Receiving in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Receiving.findById(req.params.id)
    .populate("receivedBy").exec()
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(receiving => Receiving.populate(receiving, [
      { path: 'receivedBy', select: 'name email role plant' },
      'request',
      'items.item'
    ]))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Receiving from the DB
export function destroy(req, res) {
  return Receiving.findById(req.params.id)
    .populate("receivedBy").exec()
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
    .then(saveUpdates({ active: false }))
    .then(respondWithResult(res, 204))
    .catch(handleError(res));
}


// Gets a list of Receiving by Plant
export function byPlant(req, res) {
  return Receiving.find({
      plant: req.params.id,
      active: true
    })
    .populate([
      { path: 'receivedBy', select: 'name email role plant' },
      'request',
      'items.item'
    ])
    .sort("-createdAt").exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Gets a list of Receiving by User
export function byUser(req, res) {
  return Receiving.find({
      receivedBy: req.params.id,
      active: true
    })
    .populate([
      { path: 'receivedBy', select: 'name email role plant' },
      'request',
      'items.item'
    ])
    .sort("-createdAt").exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}
