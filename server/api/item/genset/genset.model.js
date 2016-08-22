'use strict';

import mongoose from 'mongoose';

var GensetSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true
  },
  model: String,
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Validate duplicate brand
GensetSchema
  .path('brand')
  .validate(function(brand, respond) {
    var self = this;
    return this.constructor.findOne(self.model ?
      {
        brand: brand,
        model: self.model
      } : {
        brand: brand
      }
    ).exec()
      .then(function(genset) {
        if (genset) {
          if (self.id === genset.id) {
            return respond(true);
          }
          if (!genset.active) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Similar genset already exists!');

// Validate empty brand
GensetSchema
  .path('brand')
  .validate(function(brand) {
    return brand.trim().length;
  }, 'Brand cannot be empty');

export default mongoose.model('Genset', GensetSchema);
