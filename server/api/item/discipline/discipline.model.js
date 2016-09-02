'use strict';

import mongoose from 'mongoose';

var DisciplineSchema = new mongoose.Schema({
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
DisciplineSchema
  .path('name')
  .validate(function(name, respond) {
    var self = this;
    return this.constructor.findOne({ name: name }).exec()
      .then(function(discipline) {
        if (discipline) {
          if (self.id === discipline.id) {
            return respond(true);
          }
          if (!discipline.active) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Cannot have duplicate discipline name');

// Validate duplicate code
DisciplineSchema
  .path('code')
  .validate(function(code, respond) {
    var self = this;
    return this.constructor.findOne({ code: code }).exec()
      .then(function(discipline) {
        if (discipline) {
          if (self.id === discipline.id) {
            return respond(true);
          }
          if (!discipline.active) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Cannot have duplicate discipline code');

// Validate empty name
DisciplineSchema
  .path('name')
  .validate(function(name) {
    return name.trim().length;
  }, 'Name cannot be empty');

// Validate empty code
DisciplineSchema
  .path('code')
  .validate(function(code) {
    return code.trim().length;
  }, 'Code cannot be empty');

export default mongoose.model('Discipline', DisciplineSchema);
