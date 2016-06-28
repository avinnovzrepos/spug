'use strict';

import mongoose from 'mongoose';

var InventorySchema = new mongoose.Schema({
  plant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plant'
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  },
  value: {
    type: Number,
    default: 0
  },
  history: [{
    newValue: {
      type: Number,
      default: 0
    },
    previousValue: {
      type: Number,
      default: 0
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    type: {
      type: { type: String}
    },
    timestamp: {
      type: Date,
      default: Date.now,
    }
  }],
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});


/**
 * Virtuals
 */

// Non-sensitive Inventory Information
InventorySchema
  .virtual('details')
  .get(function() {
    return _.extend(this, {
      history: undefined
    });
  });

/**
 * Validations
 */

// Validate empty item
InventorySchema
  .path('item')
  .validate(function(item) {
    return !!item;
  }, 'Item field should be provided');

// Validate empty plant
InventorySchema
  .path('plant')
  .validate(function(plant) {
    return !!plant;
  }, 'Plant field should be provided');

// Validate duplicate plant item
InventorySchema
  .path('item')
  .validate(function(item, respond) {
    var self = this;
    return this.constructor.findOne({ plant: self.plant, item: self.item }).exec()
      .then(function(inventory) {
        if (inventory) {
          if (self.id === inventory.id) {
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
  }, 'An inventory for this item in this plant already exist');

export default mongoose.model('Inventory', InventorySchema);
