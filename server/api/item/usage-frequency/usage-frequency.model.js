'use strict';

import mongoose from 'mongoose';

var UsageFrequencySchema = new mongoose.Schema({
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
UsageFrequencySchema
  .path('name')
  .validate(function(name, respond) {
    var self = this;
    return this.constructor.findOne({ name: name }).exec()
      .then(function(usageFrequency) {
        if (usageFrequency) {
          if (self.id === usageFrequency.id) {
            return respond(true);
          }
          if (!usageFrequency.active) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Cannot have duplicate measurement unit name');

// Validate duplicate code
UsageFrequencySchema
  .path('code')
  .validate(function(code, respond) {
    var self = this;
    return this.constructor.findOne({ code: code }).exec()
      .then(function(usageFrequency) {
        if (usageFrequency) {
          if (self.id === usageFrequency.id) {
            return respond(true);
          }
          if (!usageFrequency.active) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Cannot have duplicate measurement unit code');

// Validate empty name
UsageFrequencySchema
  .path('name')
  .validate(function(name) {
    return name.trim().length;
  }, 'Name cannot be empty');

// Validate empty code
UsageFrequencySchema
  .path('code')
  .validate(function(code) {
    return code.trim().length;
  }, 'Code cannot be empty');

export default mongoose.model('UsageFrequency', UsageFrequencySchema);
