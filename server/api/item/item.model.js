'use strict';

import mongoose from 'mongoose';

var ItemSchema = new mongoose.Schema({
  code: String,
  name: String,
  partNumber: String,
  specification: String,
  unitOfMeasurement: String,
  unitCost: Number,
  year: String,
  categoryId: String,
  componentId: String,
  other: String,

  // Mechanical Fields
  mechanical: String,
  brand: String,
  capacity: String,
  mechanicalSpares: String,

  // Electrical Fields
  electrical: String,
  facility: String,
  electricalType: String,
  facilityType: String,
  outputVoltage: String,

  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Item', ItemSchema);
