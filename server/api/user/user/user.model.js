'use strict';

import crypto from 'crypto';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import _ from 'lodash';
import {Schema} from 'mongoose';
import { userRoles } from '../../../config/environment';
import Plant from '../../plant/plant.model';
import UserHistory from '../user-history/user-history.model';

const authTypes = ['github', 'twitter', 'facebook', 'google'];

var UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    lowercase: true,
    required: true
  },
  role: {
    type: String,
    lowercase: true,
    default: 'manager',
    enum: userRoles
  },
  plant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plant',
    required: function () {
      return this.role != 'superadmin';
    }
  },
  password: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    default: 'local'
  },
  salt: String,

  facebook: {},
  twitter: {},
  google: {},
  github: {},

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function () {
      return this.role != 'superadmin';
    }
  },
  lastUpdatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function () {
      return !this.isNew;
    }
  },

  active: {
    type: Boolean,
    default: true
  }
},
{
  timestamps: true
});

/**
 * Virtuals
 */

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id,
      'role': this.role
    };
  });

// Public information salt and password removed
UserSchema
  .virtual('public')
  .get(function() {
    return _.extend(this, {
      salt: undefined,
      password: undefined,
      provider: undefined
    });
  });

/**
 * Validations
 */

// Validate empty email
UserSchema
  .path('email')
  .validate(function(email) {
    return email.length;
  }, 'Email cannot be blank');

// Validate empty password
UserSchema
  .path('password')
  .validate(function(password) {
    return password.length;
  }, 'Password cannot be blank');

// Validate plant exists
UserSchema
  .path('plant')
  .validate(function(plant, respond) {
    var id = plant._id ? plant._id : plant;
    return Plant.findById(id).exec()
      .then(function(existing) {
        return respond(!!existing);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Plant does not exist');

// Validate email is not taken
UserSchema
  .path('email')
  .validate(function(value, respond) {
    var self = this;
    return this.constructor.findOne({ email: value }).exec()
      .then(function(user) {
        if (user) {
          if (self.id === user.id) {
            return respond(true);
          }
          if (!user.active) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'The specified email address is already in use');

var validatePresenceOf = function(value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function(next) {
    var self = this;
    self.wasNew = self.isNew;

    var hashPassword = function () {
      // Handle new/update passwords
      if (!self.isModified('password')) {
        return next();
      }

      if (!validatePresenceOf(self.password) && authTypes.indexOf(self.provider) === -1) {
        return next(new Error('Invalid password'));
      }

      // Make salt with a callback
      self.makeSalt((saltErr, salt) => {
        if (saltErr) {
          return next(saltErr);
        }
        self.salt = salt;
        self.encryptPassword(self.password, (encryptErr, hashedPassword) => {
          if (encryptErr) {
            return next(encryptErr);
          }
          self.password = hashedPassword;
          next();
        });
      });
    }

    if (self.isNew) {
      self.lastUpdatedBy = self.createdBy;
      hashPassword();
    } else {
      this.constructor.findById(self.id).then(user => {
        self.previousValue = user;
        self.isDeleted = !user.active;
        hashPassword();
      });
    }
  });


UserSchema
  .post('save', function (user) {
    var self = this;

    if (self.wasNew) {
      UserHistory.create({
        action: 'create',
        newValue: self,
        user: self,
        modifiedBy: self.lastUpdatedBy
      }).then(history => {
        // NOTHING TO DO HERE
      })
    } else {
      if (self.isDeleted && self.active) {
        UserHistory.create({
          action: 'restore',
          newValue: self,
          previousValue: self.previousValue,
          user: self,
          modifiedBy: self.lastUpdatedBy
        }).then(history => {
          // NOTHING TO DO HERE
        });
      } else if (!self.isDeleted && !self.active) {
        UserHistory.create({
          action: 'delete',
          newValue: self,
          previousValue: self.previousValue,
          user: self,
          modifiedBy: self.lastUpdatedBy
        }).then(history => {
          // NOTHING TO DO HERE
        });
      } else {
        UserHistory.create({
          action: 'update',
          newValue: self,
          previousValue: self.previousValue,
          user: self,
          modifiedBy: self.lastUpdatedBy
        }).then(history => {
          // NOTHING TO DO HERE
        });
      }
    }
  });

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} password
   * @param {Function} callback
   * @return {Boolean}
   * @api public
   */
  authenticate(password, callback) {
    if (!callback) {
      return this.password === this.encryptPassword(password);
    }

    this.encryptPassword(password, (err, pwdGen) => {
      if (err) {
        return callback(err);
      }

      if (this.password === pwdGen) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    });
  },

  /**
   * Make salt
   *
   * @param {Number} byteSize Optional salt byte size, default to 16
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  makeSalt(byteSize, callback) {
    var defaultByteSize = 16;

    if (typeof arguments[0] === 'function') {
      callback = arguments[0];
      byteSize = defaultByteSize;
    } else if (typeof arguments[1] === 'function') {
      callback = arguments[1];
    }

    if (!byteSize) {
      byteSize = defaultByteSize;
    }

    if (!callback) {
      return crypto.randomBytes(byteSize).toString('base64');
    }

    return crypto.randomBytes(byteSize, (err, salt) => {
      if (err) {
        callback(err);
      } else {
        callback(null, salt.toString('base64'));
      }
    });
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  encryptPassword(password, callback) {
    if (!password || !this.salt) {
      return null;
    }

    var defaultIterations = 10000;
    var defaultKeyLength = 64;
    var salt = new Buffer(this.salt, 'base64');

    if (!callback) {
      return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength)
                   .toString('base64');
    }

    return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, (err, key) => {
      if (err) {
        callback(err);
      } else {
        callback(null, key.toString('base64'));
      }
    });
  }
};

export default mongoose.model('User', UserSchema);
