'use strict';

import mongoose from 'mongoose';

var PlantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Validate duplicate name
PlantSchema
  .path('name')
  .validate(function(name, respond) {
    var self = this;
    return this.constructor.findOne({ name: name }).exec()
      .then(function(plant) {
        if (plant) {
          if (self.id === plant.id) {
            return respond(true);
          }
          if (!plant.active) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Cannot have duplicate plant name');

// Validate empty name
PlantSchema
  .path('name')
  .validate(function(name) {
    return name.length;
  }, 'Name should be provided');

export default mongoose.model('Plant', PlantSchema);
