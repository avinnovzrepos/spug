'use strict';

import mongoose from 'mongoose';
import Department from '../department/department.model';

var DivisionSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },

  active: {
    type: Boolean,
    default: true
  }
},{
  timestamps: true
});


// Validate empty code
DivisionSchema
  .path('code')
  .validate(function(code) {
    return code.trim().length;
  }, 'Code cannot be blank');

// Validate empty name
DivisionSchema
  .path('name')
  .validate(function(name) {
    return name.trim().length;
  }, 'Name cannot be blank');

// Validate duplicate code
DivisionSchema
  .path('code')
  .validate(function(code, respond) {
    var self = this;
    return this.constructor.findOne({ code: code }).exec()
      .then(function(division) {
        if (division) {
          if (self.id === division.id) {
            return respond(true);
          }
          if (!division.active) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Cannot have duplicate division code');

// Validate duplicate name
DivisionSchema
  .path('name')
  .validate(function(name, respond) {
    var self = this;
    return this.constructor.findOne({ name: name }).exec()
      .then(function(division) {
        if (division) {
          if (self.id === division.id) {
            return respond(true);
          }
          if (!division.active) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Cannot have duplicate division name');

// Validate department exists
DivisionSchema
  .path('department')
  .validate(function(department, respond) {
    var id = department._id ? department._id : department;
    return Department.findById(id).exec()
      .then(function(existing) {
        return respond(!!existing);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Department does not exist');

export default mongoose.model('Division', DivisionSchema);
