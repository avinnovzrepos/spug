'use strict';

import mongoose from 'mongoose';
import User from '../user/user.model';

var LoginHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  occurrance: {
    type: Date,
    default: Date.now()
  }
});


// Validate user exists
LoginHistorySchema
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

export default mongoose.model('LoginHistory', LoginHistorySchema);
