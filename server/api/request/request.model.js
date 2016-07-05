'use strict';

import mongoose from 'mongoose';
import Plant from '../plant/plant.model';
import Item from '../item/item.model';
import User from '../user/user/user.model';


// CONSTANTS
var requestTypes = [
  'plant-to-plant',
  'purchasing-to-plant'
];
var requestStatuses = [
  'pending',
  'approved',
  'declined',
  'recieved'
];

// DEFAULTS
var defaultRequestType = requestTypes[0];



var RequestSchema = new mongoose.Schema({
  requestType: {
    type: String,
    default: defaultRequestType,
    required: true,
    enum: requestTypes
  },

  // COMMON FIELDS
  destination: {
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
  status: {
    type: String,
    default: 'pending',
    enum: requestStatuses
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },


  // PLANT-TO-PLANT FIELDS
  source: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plant',
    required: function() {
      return this.requestType === 'plant-to-plant';
    }
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function() {
      return this.status === 'approved';
    }
  },




  // DELETE FIELD
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

// Validate plant exists
RequestSchema
  .path('source')
  .validate(function(plant, respond) {
    var id = plant._id ? plant._id : plant;
    return Plant.findById(id).exec()
      .then(function(existing) {
        return respond(!!existing);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'source Plant does not exist');

RequestSchema
  .path('destination')
  .validate(function(plant, respond) {
    var id = plant._id ? plant._id : plant;
    return Plant.findById(id).exec()
      .then(function(existing) {
        return respond(!!existing);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'destination Plant does not exist');


// Validate user exists
RequestSchema
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

// Validate user exists
RequestSchema
  .path('approvedBy')
  .validate(function(user, respond) {
    var id = user._id ? user._id : user;
    return User.findById(id).exec()
      .then(function(existing) {
        return respond(!!existing);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'approvedBy User does not exist');

// Validate empty items
RequestSchema
  .path('items')
  .validate(function(items) {
    return items && Array.isArray(items) && items.length > 0;
  }, 'Request cannot have an empty item list');

// Validate empty createdBy
RequestSchema
  .path('createdBy')
  .validate(function(user) {
    var self = this;
    return this.constructor.findOne({})
    switch (this.status) {
      case 'pending':
      default:
        return true;

    }
    return !!user;
  }, 'Created By should be assigned');

// Validate items exists
RequestSchema
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

export default mongoose.model('Request', RequestSchema);
