'use strict';

import mongoose from 'mongoose';
import _ from 'lodash';
import User from '../user/user.model';

var UserHistorySchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
    enum: ['create', 'update', 'delete', 'restore']
  },
  previousValue: {
    type: mongoose.Schema.Types.Mixed,
    required: function () {
      return this.action != 'create';
    }
  },
  newValue: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  modifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function () {
      return this.newValue.role != 'superadmin';
    }
  }
},{
  timestamps: true
});

// Validate user exists
UserHistorySchema
  .path('user')
  .validate(function(user, respond) {
    var id = user._id ? user._id : user;
    return User.findById(id).exec()
      .then(function(existing) {
        return respond(!!existing);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'User does not exist');

// Validate modified by exists
UserHistorySchema
  .path('modifiedBy')
  .validate(function(user, respond) {
    if (user) {
      var id = user._id ? user._id : user;
      return User.findById(id).exec()
        .then(function(existing) {
          return respond(!!existing);
        })
        .catch(function(err) {
          throw err;
        });
    } else {
      respond(true);
    }
  }, 'Modified By user does not exist');


/**
 * Hooks
 */

UserHistorySchema.pre('save', function (next) {
  var self = this;
  this.newValue = {
    name: self.newValue.name,
    email: self.newValue.email,
    password: self.newValue.password,
    role: self.newValue.role,
    plant: self.newValue.plant,
    provider: self.newValue.provider,
    salt: self.newValue.salt,
    active: self.newValue.active,
  };
  this.previousValue = this.previousValue || {};
  this.previousValue = {
    name: self.previousValue.name,
    email: self.previousValue.email,
    password: self.previousValue.password,
    role: self.previousValue.role,
    plant: self.previousValue.plant,
    provider: self.previousValue.provider,
    salt: self.previousValue.salt,
    active: self.previousValue.active,
  }
  next();
});

export default mongoose.model('UserHistory', UserHistorySchema);
