'use strict';

import mongoose from 'mongoose';

var DepartmentSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
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
DepartmentSchema
  .path('code')
  .validate(function(code) {
    return code.trim().length;
  }, 'Code cannot be blank');

// Validate empty name
DepartmentSchema
  .path('name')
  .validate(function(name) {
    return name.trim().length;
  }, 'Name cannot be blank');

// Validate duplicate code
DepartmentSchema
  .path('code')
  .validate(function(code, respond) {
    var self = this;
    return this.constructor.findOne({ code: code }).exec()
      .then(function(department) {
        if (department) {
          if (self.id === department.id) {
            return respond(true);
          }
          if (!department.active) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Cannot have duplicate department code');

// Validate duplicate name
DepartmentSchema
  .path('name')
  .validate(function(name, respond) {
    var self = this;
    return this.constructor.findOne({ name: name }).exec()
      .then(function(department) {
        if (department) {
          if (self.id === department.id) {
            return respond(true);
          }
          if (!department.active) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Cannot have duplicate department name');


export default mongoose.model('Department', DepartmentSchema);
