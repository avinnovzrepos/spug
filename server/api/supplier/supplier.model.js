'use strict';

import mongoose from 'mongoose';

var SupplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: String,
  contactNumber: {
    type: String,
    required: true
  },
  contactPerson: String,
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

/**
 * Validations
 */

// Validate empty name
SupplierSchema
  .path('name')
  .validate(function(name) {
    return name.length;
  }, 'Name should be provided');


// Validate duplicate name
SupplierSchema
  .path('name')
  .validate(function(name, respond) {
    var self = this;
    return this.constructor.findOne({ name: name }).exec()
      .then(function(supplier) {
        if (supplier) {
          if (self.id === supplier.id) {
            return respond(true);
          }
          if (!supplier.active) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Cannot have duplicate supplier name');

// Validate empty contact number
SupplierSchema
  .path('contactNumber')
  .validate(function(contactNumber) {
    return contactNumber.length;
  }, 'Contact number should be provided');

export default mongoose.model('Supplier', SupplierSchema);
