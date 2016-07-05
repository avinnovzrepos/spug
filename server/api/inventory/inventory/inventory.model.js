'use strict';

import mongoose from 'mongoose';
import InventoryHistory from '../inventory-history/inventory-history.model';
import Plant from '../../plant/plant.model';
import Item from '../../item/item.model';
import User from '../../user/user/user.model';

var InventorySchema = new mongoose.Schema({
  plant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plant',
    required: true
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
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
    ref: 'User',
    required: true
  },
  lastUpdatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function () {
      return !this.isNew;
    }
  },
}, {
  timestamps: true
});

/**
 * Validations
 */

// Validate plant exists
InventorySchema
  .path('plant')
  .validate(function(plant, respond) {
    var id = plant._id ? plant._id : plant;
    return Plant.findById(id).exec()
      .then(function(existing) {
        return respond(!!existing);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Plant does not exist');

// Validate item exists
InventorySchema
  .path('item')
  .validate(function(item, respond) {
    var id = item._id ? item._id : item;
    return Item.findById(id).exec()
      .then(function(existing) {
        return respond(!!existing);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Item does not exist');

// Validate createdBy user exists
InventorySchema
  .path('createdBy')
  .validate(function(user, respond) {
    var id = user._id ? user._id : user;
    return User.findById(id).exec()
      .then(function(existing) {
        return respond(!!existing);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'createdBy User does not exist');


// Validate lastUpdatedBy user exists
InventorySchema
  .path('lastUpdatedBy')
  .validate(function(user, respond) {
    var id = user._id ? user._id : user;
    return User.findById(id).exec()
      .then(function(existing) {
        return respond(!!existing);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'lastUpdatedBy User does not exist');


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
        action: this.receiving ? 'receiving' : 'update',
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
