/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/plants              ->  index
 * POST    /api/plants              ->  create
 * GET     /api/plants/:id          ->  show
 * PUT     /api/plants/:id          ->  update
 * DELETE  /api/plants/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Plant from './plant.model';
import Division from '../division/division.model';

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
    res.status(statusCode).send(err);
  };
}

// Gets a list of Plants
export function index(req, res) {
  return Plant.find({
      active: true,
      _id: {
        $nin: req.query.exclude ? req.query.exclude.split(',') : []
      }
    })
    .populate([
      'division',
      {
        path: 'division',
        populate: { path: 'department', model: 'Department' }
      }
    ])
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Plant from the DB
export function show(req, res) {
  return Plant.findById(req.params.id)
    .populate([
      'division',
      {
        path: 'division',
        populate: { path: 'department', model: 'Department' }
      }
    ])
    .exec()
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Plant in the DB
export function create(req, res) {
  return Plant.create(req.body)
    .catch(handleError(res))
    .then(plant => Plant.populate(plant,[
      'division',
      {
        path: 'division',
        populate: { path: 'department', model: 'Department' }
      }
    ]))
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Plant in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Plant.findById(req.params.id).exec()
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .catch(handleError(res))
    .then(plant => Plant.populate(plant,[
      'division',
      {
        path: 'division',
        populate: { path: 'department', model: 'Department' }
      }
    ]))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Plant from the DB
export function destroy(req, res) {
  return Plant.findById(req.params.id).exec()
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
    .then(saveUpdates({ active: false }))
    .then(respondWithResult(res, 204))
    .catch(handleError(res));
}

// Gets a list of Plants of a specific Division
export function byDivision(req, res) {
  return Plant.find({
      active: true,
      division: req.params.id
    })
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Plants of a specific Department
export function byDepartment(req, res) {
  return Division.find({
    active: true,
    department: req.params.id
  })
  .exec()
  .then(function (divisions) {
    return divisions.map(function(division){ return division._id });
  })
  .then(function(divisions){
    return Plant.find({
      active: true,
      division: {
        $in: divisions
      }
    })
    .populate('division')
    .exec()
  })
  .then(respondWithResult(res))
  .catch(handleError(res));
}
