'use strict';

import mongoose from 'mongoose';
import Plant from '../plant/plant.model';
import Item from '../item/item.model';
import Notification from '../notification/notification.model';
import User from '../user/user/user.model';
import Inventory from '../inventory/inventory/inventory.model';


// CONSTANTS
var requestStatuses = [
  'pending',
  'approved',
  'declined',
  'recieved'
];


var RequestSchema = new mongoose.Schema({

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
    required: true
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function() {
      return ['approved', 'declined'].indexOf(this.status) >= 0;
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


var Request = mongoose.model('Request', RequestSchema);

/**
 * Hooks
 */

Request.schema.pre('save', function (next) {
  var self = this;
  self.wasNew = self.isNew;
  if (self.isNew) {
    next();
  } else {
    Request.findById(self.id).then(request => {
      self.previousStatus = request.status;
      self.isDeleted = !request.active;
      if (request.status != 'approved' && self.status == 'approved') {
        // VALIDATE INSUFFICIENT SUPPLY
        var inventories = [];
        var failed = false;
        self.items.forEach(function (requestItem) {
          Inventory.findOne({
            item: requestItem.item,
            plant: self.source
          }).then(inventory => {
            if (!inventory) {
              if (!failed) {
                Item
                  .findById(requestItem.item).exec()
                  .then(i => next(new Error('Insufficient supply for ' + i.name)))
                failed = true;
              }
            }
            inventories.push(inventory)
            if (inventories.length == self.items.length) {
              if (!failed) next();
            }
          })
        });
      } else {
        next();
      }
    });
  }
});

Request.schema.post('save', function (inventory) {
  var self = this;
  if (this.wasNew) {
    Notification.create({
      plant: self.source,
      text: "New request from " + self.destination.name + ".",
      details: {
        request: self
      }
    }).then(notification => {
      // TODO
    });
  } else {
    if (self.previousStatus == 'pending' && self.status == 'declined') {
      Notification.create({
        plant: self.destination,
        text: "Declined request.",
        details: {
          request: self
        }
      }).then(notification => {
        // TODO
      });
    } else if (self.previousStatus != 'approved' && self.status == 'approved') {
      // APPROVED
      self.items.forEach(function (requestItem) {
        Inventory.findOne({
          item: requestItem.item,
          plant: self.source
        }).then(inventory => {
          inventory.requisition = true;
          inventory.value = inventory.value - requestItem.quantity;
          inventory.save().then(i => {
            // NOTHING TO DO HERE
          });
        });
      });
    } else if (self.previousStatus == 'approved' && self.status != 'approved') {
      // UNAPPROVED
      self.items.forEach(function (requestItem) {
        Inventory.findOne({
          item: requestItem.item,
          plant: self.source
        }).then(inventory => {
          inventory.requisition = true;
          inventory.value = inventory.value + requestItem.quantity;
          inventory.save().then(i => {
            // NOTHING TO DO HERE
          });
        });
      });
    } else {
      // NOTHING TO DO HERE
    }
  }
});


export default Request;
