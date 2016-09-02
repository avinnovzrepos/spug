'use strict';

import mongoose from 'mongoose';

var StorageLevelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});


// Validate duplicate name
StorageLevelSchema
  .path('name')
  .validate(function(name, respond) {
    var self = this;
    return this.constructor.findOne({ name: name }).exec()
      .then(function(storageLevel) {
        if (storageLevel) {
          if (self.id === storageLevel.id) {
            return respond(true);
          }
          if (!storageLevel.active) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Cannot have duplicate storage-level name');

// Validate duplicate code
StorageLevelSchema
  .path('code')
  .validate(function(code, respond) {
    var self = this;
    return this.constructor.findOne({ code: code }).exec()
      .then(function(storageLevel) {
        if (storageLevel) {
          if (self.id === storageLevel.id) {
            return respond(true);
          }
          if (!storageLevel.active) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Cannot have duplicate storage-level code');

// Validate empty name
StorageLevelSchema
  .path('name')
  .validate(function(name) {
    return name.trim().length;
  }, 'Name cannot be empty');

// Validate empty code
StorageLevelSchema
  .path('code')
  .validate(function(code) {
    return code.trim().length;
  }, 'Code cannot be empty');

export default mongoose.model('StorageLevel', StorageLevelSchema);
