'use strict';

import mongoose from 'mongoose';
import Plant from '../plant/plant.model';

var NotificationSchema = new mongoose.Schema({
  read: {
    type: Boolean,
    default: false
  },
  plant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plant',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  }
},{
  timestamps: true
});


// Validate empty text
NotificationSchema
  .path('text')
  .validate(function(text) {
    return text.length;
  }, 'Text cannot be blank');

// Validate plant exists
NotificationSchema
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

export default mongoose.model('Notification', NotificationSchema);
