'use strict';

import User from './user.model';
import _ from 'lodash';

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
    var updated = _.merge(entity , updates);
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

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

export function index(req, res) {
  return User.find({active: true}, '-salt -password')
    .populate('plant').exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function create(req, res, next) {
  // admin cannot create another admin or superadmin
  if (req.user.role === 'admin' && ['admin', 'superadmin'].indexOf(req.body.role) >= 0) {
    return res.status(403).end();
  }

  User.create(req.body)
    .catch(validationError(res))
    .then(user => User.populate(user, 'plant'))
    .catch(handleError(res))
    .then(user => user.public)
    .then(respondWithResult(res, 201));
}

export function show(req, res) {
  return User.findById(req.params.id)
    .populate('plant').exec()
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
    .then(user => user && user.public)
    .then(respondWithResult(res));
}

export function destroy(req, res) {
  return User.findById(req.params.id).exec()
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
    // admin cannot delete another admin and superuser
    .then(user => (req.user.role === 'admin' && ['admin', 'superadmin'].indexOf(user.role) >= 0) ?
      res.status(403).end() :
      user
    )
    .then(saveUpdates({ active: false }))
    .catch(err => validationError(err))
    .then(user => User.populate(user, 'plant'))
    .then(user => user && user.public)
    .then(respondWithResult(res, 204));
}

export function changePassword(req, res, next) {
  return User.findById(req.params.id).exec()
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
    .then(user => user.authenticate(String(req.body.oldPassword)) ? user : res.status(403).end())
    .then(saveUpdates({ password: String(req.body.newPassword) }))
    .catch(err => validationError(err))
    .then(user => User.populate(user, 'plant'))
    .catch(handleError(res))
    .then(user => user && user.public)
    .then(respondWithResult(res, 204));
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
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
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
    .then(saveUpdates(req.body))
    .catch(validationError(res))
    .then(user => User.populate(user, 'plant'))
    .catch(handleError(res))
    .then(user => user && user.public)
    .then(respondWithResult(res));
}

export function me(req, res, next) {
  return User.findById(req.user._id)
    .populate('plant').exec()
    .catch(handleError(res))
    .then(handleEntityNotFound(res))
    .then(user => user && user.public)
    .then(respondWithResult(res));
}

/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
  res.redirect('/');
}
