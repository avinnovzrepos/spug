'use strict';

import mongoose from 'mongoose';

var ComponentSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  description: {
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


// Validate duplicate description
ComponentSchema
  .path('description')
  .validate(function(description, respond) {
    var self = this;
    return this.constructor.findOne({ description: description }).exec()
      .then(function(component) {
        if (component) {
          if (self.id === component.id) {
            return respond(true);
          }
          if (!component.active) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Cannot have duplicate component description');

// Validate duplicate code
ComponentSchema
  .path('code')
  .validate(function(code, respond) {
    var self = this;
    return this.constructor.findOne({ code: code }).exec()
      .then(function(component) {
        if (component) {
          if (self.id === component.id) {
            return respond(true);
          }
          if (!component.active) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Cannot have duplicate component code');

// Validate empty code
ComponentSchema
  .path('code')
  .validate(function(code) {
    return code.trim().length;
  }, 'Code cannot be empty');

// Validate empty description
ComponentSchema
  .path('description')
  .validate(function(description) {
    return description.trim().length;
  }, 'Name cannot be empty');

export default mongoose.model('Component', ComponentSchema);
