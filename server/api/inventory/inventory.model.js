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
  critical: {
    type: Number,
    default: 0
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

// Validate duplicate inventory item
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
          if (!inventory.active) {
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
