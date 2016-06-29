'use strict';

import mongoose from 'mongoose';

var InventoryHistorySchema = new mongoose.Schema({
  inventory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inventory'
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

export default mongoose.model('InventoryHistory', InventoryHistorySchema);
