'use strict';

import mongoose from 'mongoose';

var MeasurementUnitSchema = new mongoose.Schema({
  name: String,
  description: String,
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});


// Validate duplicate name
MeasurementUnitSchema
  .path('name')
  .validate(function(name, respond) {
    var self = this;
    return this.constructor.findOne({ name: name }).exec()
      .then(function(measurementUnit) {
        if (measurementUnit) {
          if (self.id === measurementUnit.id) {
            return respond(true);
          }
          if (!measurementUnit.active) {
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

export default mongoose.model('MeasurementUnit', MeasurementUnitSchema);
