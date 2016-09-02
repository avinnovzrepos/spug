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
import * as helper from '../../components/helper';

// Gets a list of Plants
export function index(req, res) {
  return Plant.find({
      active: true,
      _id: {
        $nin: req.query.exclude ? req.query.exclude.split(',') : []
      }
    })
    .populate([
      {
        path: 'division',
        populate: { path: 'department', model: 'Department' }
      }
    ])
    .exec()
    .then(helper.respondWithResult(res))
    .catch(helper.handleError(res));
}

// Gets a single Plant from the DB
export function show(req, res) {
  return Plant.findById(req.params.id)
    .populate([
      {
        path: 'division',
        populate: { path: 'department', model: 'Department' }
      }
    ])
    .exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.respondWithResult(res));
}

// Creates a new Plant in the DB
export function create(req, res) {
  return Plant.create(req.body)
    .catch(helper.validationError(res))
    .then(plant => Plant.populate(plant,[
      {
        path: 'division',
        populate: { path: 'department', model: 'Department' }
      }
    ]))
    .then(helper.respondWithResult(res, 201))
    .catch(helper.handleError(res));
}

// Updates an existing Plant in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Plant.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.saveUpdates(req.body))
    .catch(helper.validationError(res))
    .then(plant => Plant.populate(plant,[
      {
        path: 'division',
        populate: { path: 'department', model: 'Department' }
      }
    ]))
    .then(helper.respondWithResult(res))
    .catch(helper.handleError(res));
}

// Deletes a Plant from the DB
export function destroy(req, res) {
  return Plant.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(helper.saveUpdates({ active: false }))
    .then(helper.respondWithResult(res, 204))
    .catch(helper.handleError(res));
}

// Gets a list of Plants of a specific Division
export function byDivision(req, res) {
  return Plant.find({
      active: true,
      division: req.params.id
    })
    .exec()
    .then(helper.respondWithResult(res))
    .catch(helper.handleError(res));
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
  .then(helper.respondWithResult(res))
  .catch(helper.handleError(res));
}
