'use strict';

import mongoose from 'mongoose';

var LoginHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  occurrance: {
    type: Date,
    default: Date.now()
  }
});

export default mongoose.model('LoginHistory', LoginHistorySchema);
