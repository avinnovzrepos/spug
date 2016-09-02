'use strict';

import mongoose from 'mongoose';

var MaintenanceRequirementSchema = new mongoose.Schema({
  description: {
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


// Validate duplicate description
MaintenanceRequirementSchema
  .path('description')
  .validate(function(description, respond) {
    var self = this;
    return this.constructor.findOne({ description: description }).exec()
      .then(function(maintenanceRequirement) {
        if (maintenanceRequirement) {
          if (self.id === maintenanceRequirement.id) {
            return respond(true);
          }
          if (!maintenanceRequirement.active) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Cannot have duplicate maintenance requirement description');

// Validate duplicate code
MaintenanceRequirementSchema
  .path('code')
  .validate(function(code, respond) {
    var self = this;
    return this.constructor.findOne({ code: code }).exec()
      .then(function(maintenanceRequirement) {
        if (maintenanceRequirement) {
          if (self.id === maintenanceRequirement.id) {
            return respond(true);
          }
          if (!maintenanceRequirement.active) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Cannot have duplicate maintenance requirement code');

// Validate empty description
MaintenanceRequirementSchema
  .path('description')
  .validate(function(description) {
    return description.trim().length;
  }, 'Descripition cannot be empty');

// Validate empty code
MaintenanceRequirementSchema
  .path('code')
  .validate(function(code) {
    return code.trim().length;
  }, 'Code cannot be empty');

export default mongoose.model('MaintenanceRequirement', MaintenanceRequirementSchema);
