'use strict';

import mongoose from 'mongoose';

var MeasurementUnitSchema = new mongoose.Schema({
  name: String,
  description: String,
  active: {
    type: Boolean,
    default: true
  }
});

export default mongoose.model('MeasurementUnit', MeasurementUnitSchema);
