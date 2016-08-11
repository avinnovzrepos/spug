'use strict';

import mongoose from 'mongoose';

var ClassificationSchema = new mongoose.Schema({
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
ClassificationSchema
  .path('name')
  .validate(function(name, respond) {
    var self = this;
    return this.constructor.findOne({ name: name }).exec()
      .then(function(classification) {
        if (classification) {
          if (self.id === classification.id) {
            return respond(true);
          }
          if (!classification.active) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Cannot have duplicate classification name');

// Validate duplicate code
ClassificationSchema
  .path('code')
  .validate(function(code, respond) {
    var self = this;
    return this.constructor.findOne({ code: code }).exec()
      .then(function(classification) {
        if (classification) {
          if (self.id === classification.id) {
            return respond(true);
          }
          if (!classification.active) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Cannot have duplicate classification code');

// Validate empty name
ClassificationSchema
  .path('name')
  .validate(function(name) {
    return name.trim().length;
  }, 'Name cannot be empty');

// Validate empty code
ClassificationSchema
  .path('code')
  .validate(function(code) {
    return code.trim().length;
  }, 'Code cannot be empty');

export default mongoose.model('Classification', ClassificationSchema);
