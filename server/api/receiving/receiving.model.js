'use strict';

import mongoose from 'mongoose';
import PurchaseOrder from '../purchase-order/purchase-order.model';
import User from '../user/user.model';
import Item from '../item/item.model';
import Inventory from '../inventory/inventory.model';

var ReceivingSchema = new mongoose.Schema({
  purchaseOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PurchaseOrder',
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
    default: []
  },
  receivedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  active: {
    type: String,
    default: true
  }
},{
  timestamps: true
});



/**
 * Validations
 */

// Validate user exists
ReceivingSchema
  .path('receivedBy')
  .validate(function(user, respond) {
    var id = user._id ? user._id : user;
    return User.findById(id).exec()
      .then(function(existing) {
        return respond(!!existing);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'receivedBy User does not exist');

// Validate purchaseOrder exists
ReceivingSchema
  .path('purchaseOrder')
  .validate(function(purchaseOrder, respond) {
    var id = purchaseOrder._id ? purchaseOrder._id : purchaseOrder;
    return PurchaseOrder.findById(id).exec()
      .then(function(existing) {
        return respond(!!existing);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Purchase Order does not exist');

// Validate empty items
ReceivingSchema
  .path('items')
  .validate(function(items) {
    return items && Array.isArray(items) && items.length > 0;
  }, 'Receiving cannot have an empty item list');

// ReceivingSchema items exists
ReceivingSchema
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


/**
 * Hooks
 */

ReceivingSchema.pre('save', function (next) {
  var self = this;
  self.wasNew = self.isNew;
  PurchaseOrder.findById(self.purchaseOrder._id ? self.purchaseOrder : self.purchaseOrder)
    .then(purchaseOrder => {
      self.purchaseOrder = purchaseOrder;
      if (self.isNew) {
        next();
      } else {
        this.constructor.findById(self.id).then(receiving => {
          self.previousValue = receiving.items;
          self.isDeleted = !receiving.active;
          next();
        });
      }
    })
});

var addInInventory = function (self, callback) {
  self.items.forEach(function (receivingItem, index) {
    Inventory.findOne({
      item: receivingItem.item,
      plant: self.receivedBy.plant
    }).then(function (inventory) {
      if (inventory) {
        inventory.receiving = true;
        inventory.value = inventory.value + receivingItem.quantity;
        inventory.lastUpdatedBy = self.receivedBy;
        inventory.save().then(function (saved) {
          if (index == self.items.length - 1) {
            self.purchaseOrder.status = 'recieved';
            self.purchaseOrder.save().then(function () {
              // NOTHING TODO
            });
          }
        })
      } else {
        Inventory.create({
          createdBy: self.receivedBy,
          plant: self.receivedBy.plant,
          item: receivingItem.item,
          value: receivingItem.quantity,
          receiving: true
        }).then(function (saved) {
          if (index == self.items.length - 1) {
            self.purchaseOrder.status = 'recieved';
            self.purchaseOrder.save().then(function () {
              if (callback) callback();
            });
          }
        });
      }
    });
  });
}

var revertInventory = function (self, callback) {
  self.previousValue.forEach(function (receivingItem, index) {
    Inventory.findOne({
      item: receivingItem.item,
      plant: self.receivedBy.plant
    }).then(function (inventory) {
      if (inventory) {
        inventory.receiving = true;
        inventory.value = inventory.value - receivingItem.quantity;
        inventory.lastUpdatedBy = self.receivedBy;
        inventory.save().then(function (saved) {
          if (index == self.items.length - 1) {
            self.purchaseOrder.status = 'pending';
            self.purchaseOrder.save().then(function () {
              if (callback) callback();
            });
          }
        })
      } else {
        Inventory.create({
          createdBy: self.receivedBy,
          plant: self.receivedBy.plant,
          item: receivingItem.item,
          value: receivingItem.quantity,
          receiving: true
        }).then(function (saved) {
          if (index == self.items.length - 1) {
            self.purchaseOrder.status = 'recieved';
            self.purchaseOrder.save().then(function () {
              if (callback) callback();
            });
          }
        });
      }
    });
  });
}

ReceivingSchema.post('save', function (inventory) {
  var self = this;

  if (self.wasNew) {
    addInInventory(self);
  } else {
    if (!this.isDeleted && !this.active) {
      revertInventory(self);
    } else if (this.isDeleted && this.active) {
      addInInventory(self)
    } else {
      revertInventory(self, function () {
        addInInventory(self);
      });
    }
  }
});


export default mongoose.model('Receiving', ReceivingSchema);
