'use strict';

import User from './user.model';
import * as helper from '../../../components/helper';

export function index(req, res) {
  return User.find({active: true}, '-salt -password')
    .populate([
      {
        path: 'plant',
        populate: {
          path: 'division',
          model: 'Division',
          populate: {
            path: 'department',
            model: 'Department'
          }
        }
      }
    ]).exec()
    .then(helper.respondWithResult(res))
    .catch(helper.handleError(res));
}

export function create(req, res, next) {
  // admin cannot create another admin or superadmin
  if (req.user.role === 'admin' && ['admin', 'superadmin'].indexOf(req.body.role) >= 0) {
    return res.status(403).end();
  }

  req.body.createdBy = req.user;
  User.create(req.body)
    .catch(helper.validationError(res))
    .then(user => User.populate(user, [
      {
        path: 'plant',
        populate: {
          path: 'division',
          model: 'Division',
          populate: {
            path: 'department',
            model: 'Department'
          }
        }
      }
    ]))
    .catch(helper.handleError(res))
    .then(user => user && user.public)
    .then(helper.respondWithResult(res, 201));
}

export function show(req, res) {
  return User.findById(req.params.id)
    .populate([
      {
        path: 'plant',
        populate: {
          path: 'division',
          model: 'Division',
          populate: {
            path: 'department',
            model: 'Department'
          }
        }
      },
      'lastUpdatedBy',
      'createdBy'
    ]).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(user => user && user.public)
    .then(helper.respondWithResult(res));
}

export function destroy(req, res) {
  req.body.lastUpdatedBy = req.user;
  return User.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    // admin cannot delete another admin and superuser
    .then(user => (req.user.role === 'admin' && ['admin', 'superadmin'].indexOf(user.role) >= 0) ?
      res.status(403).end() :
      user
    )
    .then(helper.saveUpdates({ active: false }))
    .then(helper.respondWithResult(res, 204))
    .catch(helper.handleError(res));
}

export function changePassword(req, res, next) {
  req.body.lastUpdatedBy = req.user;
  return User.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(user => user.authenticate(String(req.body.oldPassword)) ? user : res.status(403).end())
    .then(helper.saveUpdates({ password: String(req.body.newPassword) }))
    .then(helper.respondWithResult(res, 204))
    .catch(helper.validationError(res));
}

/**
 * Updates user info
 */
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  if (req.body.password) {
    delete req.body.password;
  }
  return User.findById(req.params.id).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(user => {
      if (req.body.role && (req.body.role !== user.role)) {
        switch (req.user.role) {
          case 'superadmin': // superadmins can edit any user
            return user;
            break;
          case 'admin': // admins cannot edit a superadmin & admin
            switch (user.role) {
              case 'superadmin':
              case 'admin':
                res.status(401).end();
                break;
              default: // admins should not be able to promote users to admin/superadmin
                switch (req.body.role) {
                  case 'superadmin':
                  case 'admin':
                    res.status(401).end();
                    break;
                  default:
                    return user;
                    break;
                }
                break;
            }
          default: // other users cannot edit user role
            res.status(401).end();
            break;
        }
      }
      return user;
    })
    .then(helper.saveUpdates(req.body))
    .catch(helper.validationError(res))
    .then(user => User.populate(user, [
      {
        path: 'plant',
        populate: {
          path: 'division',
          model: 'Division',
          populate: {
            path: 'department',
            model: 'Department'
          }
        }
      },
      'createdBy',
      'lastUpdatedBy'
    ]))
    .catch(helper.handleError(res))
    .then(user => user && user.public)
    .then(helper.respondWithResult(res));
}

export function me(req, res, next) {
  return User.findById(req.user._id)
    .populate([
      {
        path: 'plant',
        populate: {
          path: 'division',
          model: 'Division',
          populate: {
            path: 'department',
            model: 'Department'
          }
        }
      }
    ]).exec()
    .catch(helper.handleError(res))
    .then(helper.handleEntityNotFound(res))
    .then(user => user && user.public)
    .then(helper.respondWithResult(res));
}


// Gets a list of Users of a specific Plant
export function plant(req, res) {
  return User.find({
    active: true,
    plant: req.params.id
  }, '-salt -password')
  .exec()
  .then(helper.respondWithResult(res))
  .catch(helper.handleError(res));
}

/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
  res.redirect('/');
}
