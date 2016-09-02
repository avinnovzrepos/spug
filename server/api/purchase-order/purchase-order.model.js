'use strict';

import mongoose from 'mongoose';

import Plant from '../plant/plant.model';
import Item from '../item/item/item.model';
import User from '../user/user/user.model';

var statuses = [
  'pending',
  'declined',
  'received'
];

var PurchaseOrderSchema = new mongoose.Schema({
  plant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plant',
    required: true
  },
  items: {
    type: [{
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
      },
      quantity: {
        type: Number,
        default: 0
      }
    }],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    default: 'pending',
    enum: statuses
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

PurchaseOrderSchema
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


// Validate empty items
PurchaseOrderSchema
  .path('items')
  .validate(function(items) {
    return items && Array.isArray(items) && items.length > 0;
  }, 'Request cannot have an empty item list');

// Validate items exists
PurchaseOrderSchema
  .path('items')
  .validate(function(items, respond) {
    return Item.find({
      _id: {
        $in: items.map(function (item) {
          return item.item._id ? item.item._id : item.item;
        })
      }
    }).exec()
      .then(function(existing) {
        return respond(existing.length === items.length);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Item does not exist');


// Validate user exists
PurchaseOrderSchema
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


export default mongoose.model('PurchaseOrder', PurchaseOrderSchema);
