'use strict';

import mongoose from 'mongoose';
import InventoryHistory from '../inventory-history/inventory-history.model';

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
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  lastUpdatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
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

var Inventory = mongoose.model('Inventory', InventorySchema);
export default Inventory;

/**
 * Hooks
 */

Inventory.schema.pre('save', function (next) {
  var self = this;
  self.wasNew = self.isNew;
  if (self.isNew) {
    self.lastUpdatedBy = self.createdBy;
    next();
  } else {
    Inventory.findById(self.id).then(inventory => {
      self.previousValue = inventory.value;
      self.isDeleted = !inventory.active;
      next();
    });
  }
});

Inventory.schema.post('save', function (inventory) {
  if (this.wasNew) {
    InventoryHistory.create({
      action: 'create',
      newValue: inventory.value,
      inventory: inventory,
      user: inventory.lastUpdatedBy
    });
  } else {
    if (inventory.value != inventory.previousValue) {
      InventoryHistory.create({
        action: 'update',
        newValue: inventory.value,
        previousValue: inventory.previousValue,
        inventory: inventory,
        user: inventory.lastUpdatedBy
      });
    } else if (!this.isDeleted && !this.active) {
      InventoryHistory.create({
        action: 'delete',
        newValue: inventory.value,
        previousValue: inventory.previousValue,
        inventory: inventory,
        user: inventory.lastUpdatedBy
      });
    } else if (this.isDeleted && this.active) {
      InventoryHistory.create({
        action: 'restored',
        newValue: inventory.value,
        previousValue: inventory.previousValue,
        inventory: inventory,
        user: inventory.lastUpdatedBy
      });
    }
  }
});
