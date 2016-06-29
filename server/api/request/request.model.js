'use strict';

import mongoose from 'mongoose';

var RequestSchema = new mongoose.Schema({
  source: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plant'
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plant'
  },
  items: {
    type: [{
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
      },
      quantity: Number
    }],
    default: []
  },
  status: {
    type: String,
    default: 'pending'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  claimedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
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

// Validate empty source
RequestSchema
  .path('source')
  .validate(function(source) {
    return !!source;
  }, 'Request should have a source Plant');

// Validate empty destination
RequestSchema
  .path('destination')
  .validate(function(destination) {
    return !!destination;
  }, 'Request should have a destination Plant');

// Validate empty items
RequestSchema
  .path('items')
  .validate(function(items) {
    return items && Array.isArray(items) && items.length > 0;
  }, 'Request cannot have an empty item list');

export default mongoose.model('Request', RequestSchema);
