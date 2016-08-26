'use strict';

import mongoose from 'mongoose';
import Classification from '../classification/classification.model';
import MeasurementUnit from '../measurement-unit/measurement-unit.model';
import StorageLevel from '../storage-level/storage-level.model';
import UsageFrequency from '../usage-frequency/usage-frequency.model';
import MaintenanceRequirement from '../maintenance-requirement/maintenance-requirement.model';
import Discipline from '../discipline/discipline.model';
import Genset from '../genset/genset.model';
import Component from '../component/component.model';

var ItemSchema = new mongoose.Schema({

  code: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  specification: {
    type: String,
    required: true
  },
  supplierLedgerCard: {
    type: String,
    required: true
  },


  partItemNumber: {
    type: String,
    required: true
  },
  manufacturerPartNumber: {
    type: String,
    required: true
  },
  utilityPartNumber: {
    type: String,
    required: true
  },


  classification: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classification',
    required: true
  },
  measurementUnit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MeasurementUnit',
    required: true
  },
  storageLevel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StorageLevel',
    required: true
  },
  usageFrequency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UsageFrequency',
    required: true
  },
  maintenanceRequirement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MaintenanceRequirement',
    required: true
  },
  discipline: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Discipline',
    required: true
  },


  quantityRequirement: {
    type: Number,
    default: 0
  },
  minimumStockLevel: {
    type: Number,
    default: 0
  },
  reorderingLevel: {
    type: Number,
    default: 0
  },
  maximumStockLevel: {
    type: Number,
    default: 0
  },


  component: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Component',
    required: true
  },


  // MECHANICAL FIELDS
  gensetMake: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genset',
    required: function () {
      return this.discipline.name && this.discipline.name.toLowerCase().indexOf('mechanical') >= 0;
    }
  },
  capacity: {
    type: String,
    required: function () {
      return this.discipline.name && this.discipline.name.toLowerCase().indexOf('mechanical') >= 0;
    }
  },
  category: {
    type: String,
    required: function () {
      return this.discipline.name && this.discipline.name.toLowerCase().indexOf('mechanical') >= 0;
    }
  },


  // ELECTRICAL FIELDS
  facility: {
    type: String,
    required: function () {
      return this.discipline.name && this.discipline.name.toLowerCase().indexOf('electrical') >= 0;
    }
  },
  facilityType: {
    type: String,
    required: function () {
      return this.discipline.name && this.discipline.name.toLowerCase().indexOf('electrical') >= 0;
    }
  },
  electricalType: {
    type: String,
    required: function () {
      return this.discipline.name && this.discipline.name.toLowerCase().indexOf('electrical') >= 0;
    }
  },
  outVoltage: {
    type: String,
    required: function () {
      return this.discipline.name && this.discipline.name.toLowerCase().indexOf('electrical') >= 0;
    }
  },
  electricalCategory: {
    type: String,
    required: function () {
      return this.discipline.name && this.discipline.name.toLowerCase().indexOf('electrical') >= 0;
    }
  },




  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});


// Validate empty code
ItemSchema
  .path('code')
  .validate(function(code) {
    return code.trim().length;
  }, 'Code cannot be blank');

// Validate duplicate code
ItemSchema
  .path('code')
  .validate(function(code, respond) {
    var self = this;
    return this.constructor.findOne({ code: code }).exec()
      .then(function(item) {
        if (item) {
          if (self.id === item.id) {
            return respond(true);
          }
          if (!item.active) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Cannot have duplicate item code');

// Validate classification exists
ItemSchema
  .path('classification')
  .validate(function(classification, respond) {
    var id = classification._id ? classification._id : classification;
    return Classification.findById(id).exec()
      .then(function(existing) {
        return respond(!!existing);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Classification does not exist');

// Validate measurement unit exists
ItemSchema
  .path('measurementUnit')
  .validate(function(measurementUnit, respond) {
    var id = measurementUnit._id ? measurementUnit._id : measurementUnit;
    return MeasurementUnit.findById(id).exec()
      .then(function(existing) {
        return respond(!!existing);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Measurement Unit does not exist');

// Validate storage level exists
ItemSchema
  .path('storageLevel')
  .validate(function(storageLevel, respond) {
    var id = storageLevel._id ? storageLevel._id : storageLevel;
    return StorageLevel.findById(id).exec()
      .then(function(existing) {
        return respond(!!existing);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Storage Level does not exist');

// Validate usage frequency exists
ItemSchema
  .path('usageFrequency')
  .validate(function(usageFrequency, respond) {
    var id = usageFrequency._id ? usageFrequency._id : usageFrequency;
    return UsageFrequency.findById(id).exec()
      .then(function(existing) {
        return respond(!!existing);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Usage Frequency does not exist');

// Validate maintenance requirement exists
ItemSchema
  .path('maintenanceRequirement')
  .validate(function(maintenanceRequirement, respond) {
    var id = maintenanceRequirement._id ? maintenanceRequirement._id : maintenanceRequirement;
    return MaintenanceRequirement.findById(id).exec()
      .then(function(existing) {
        return respond(!!existing);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Maintenance Requirement does not exist');

// Validate discipline exists
ItemSchema
  .path('discipline')
  .validate(function(discipline, respond) {
    var id = discipline._id ? discipline._id : discipline;
    return Discipline.findById(id).exec()
      .then(function(existing) {
        return respond(!!existing);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Item Discipline does not exist');

// Validate component exists
ItemSchema
  .path('component')
  .validate(function(component, respond) {
    var id = component._id ? component._id : component;
    return Component.findById(id).exec()
      .then(function(existing) {
        return respond(!!existing);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Item Component does not exist');

// Validate gensetMake exists
ItemSchema
  .path('gensetMake')
  .validate(function(gensetMake, respond) {
    var id = gensetMake._id ? gensetMake._id : gensetMake;
    return Genset.findById(id).exec()
      .then(function(existing) {
        return respond(!!existing);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Item Genset Make does not exist');


// Validate empty description
ItemSchema
  .path('description')
  .validate(function(description) {
    return description.trim().length;
  }, 'Description cannot be empty');

// Validate empty specification
ItemSchema
  .path('specification')
  .validate(function(specification) {
    return specification.trim().length;
  }, 'Specification cannot be empty');

// Validate empty supplierLedgerCard
ItemSchema
  .path('supplierLedgerCard')
  .validate(function(supplierLedgerCard) {
    return supplierLedgerCard.trim().length;
  }, 'Supplier ledger card cannot be empty');

// Validate empty partItemNumber
ItemSchema
  .path('partItemNumber')
  .validate(function(partItemNumber) {
    return partItemNumber.trim().length;
  }, 'Part item number cannot be empty');

// Validate empty manufacturerPartNumber
ItemSchema
  .path('manufacturerPartNumber')
  .validate(function(manufacturerPartNumber) {
    return manufacturerPartNumber.trim().length;
  }, 'Manufacturer part number cannot be empty');

// Validate empty utilityPartNumber
ItemSchema
  .path('utilityPartNumber')
  .validate(function(utilityPartNumber) {
    return utilityPartNumber.trim().length;
  }, 'Utility part number cannot be empty');

// Validate empty capacity
ItemSchema
  .path('capacity')
  .validate(function(capacity) {
    return capacity.trim().length;
  }, 'Capacity cannot be empty');

// Validate empty category
ItemSchema
  .path('category')
  .validate(function(category) {
    return category.trim().length;
  }, 'Category cannot be empty');

// Validate empty facility
ItemSchema
  .path('facility')
  .validate(function(facility) {
    return facility.trim().length;
  }, 'Facility cannot be empty');

// Validate empty facility type
ItemSchema
  .path('facilityType')
  .validate(function(facilityType) {
    return facilityType.trim().length;
  }, 'Facility type cannot be empty');

// Validate empty electrical type
ItemSchema
  .path('electricalType')
  .validate(function(electricalType) {
    return electricalType.trim().length;
  }, 'Electrical type cannot be empty');

// Validate empty outVoltage
ItemSchema
  .path('outVoltage')
  .validate(function(outVoltage) {
    return outVoltage.trim().length;
  }, 'Out Voltage cannot be empty');

// Validate empty electricalCategory
ItemSchema
  .path('electricalCategory')
  .validate(function(electricalCategory) {
    return electricalCategory.trim().length;
  }, 'Electrical Category cannot be empty');

export default mongoose.model('Item', ItemSchema);
