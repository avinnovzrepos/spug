'use strict';

import mongoose from 'mongoose';
import Inventory from '../inventory/inventory.model';
import User from '../user/user.model';

var InventoryHistorySchema = new mongoose.Schema({
  inventory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inventory',
    required: true
  },
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
  action: String
}, {
  timestamps: true
});


// Validate inventory exists
InventoryHistorySchema
  .path('inventory')
  .validate(function(inventory, respond) {
    var id = inventory._id ? inventory._id : inventory;
    return Inventory.findById(id).exec()
      .then(function(existing) {
        return respond(!!existing);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Inventory does not exist');


// Validate user exists
InventoryHistorySchema
  .path('user')
  .validate(function(user, respond) {
    var id = user._id ? user._id : user;
    return User.findById(id).exec()
      .then(function(existing) {
        return respond(!!existing);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'User does not exist');

export default mongoose.model('InventoryHistory', InventoryHistorySchema);
