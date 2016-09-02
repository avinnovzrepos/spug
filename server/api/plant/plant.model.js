'use strict';

import mongoose from 'mongoose';
import Division from '../division/division.model';

var PlantSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  division: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Division',
    required: true
  },
  location: {
    type: { type: String, default:'Point' },
    coordinates: { type: [Number], default: [0, 0] }
  },

  active: {
    type: Boolean,
    default: true
  }
},{
  timestamps: true
});


// Validate empty code
PlantSchema
  .path('code')
  .validate(function(code) {
    return code.trim().length;
  }, 'Code cannot be blank');

// Validate empty name
PlantSchema
  .path('name')
  .validate(function(name) {
    return name.trim().length;
  }, 'Name cannot be blank');

// Validate duplicate code
PlantSchema
  .path('code')
  .validate(function(code, respond) {
    var self = this;
    return this.constructor.findOne({ code: code }).exec()
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
  }, 'Cannot have duplicate plant code');

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

// Validate division exists
PlantSchema
  .path('division')
  .validate(function(division, respond) {
    var id = division._id ? division._id : division;
    return Division.findById(id).exec()
      .then(function(existing) {
        return respond(!!existing);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Division does not exist');

PlantSchema.index({ location : '2dsphere' });

export default mongoose.model('Plant', PlantSchema);
