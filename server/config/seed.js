/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

import _ from 'lodash';

import Department from '../api/department/department.model';
import Division from '../api/division/division.model';

import User from '../api/user/user/user.model';
import UserHistory from '../api/user/user-history/user-history.model';
import LoginHistory from '../api//user/login-history/login-history.model';

import Plant from '../api/plant/plant.model';

import MeasurementUnit from '../api/item/measurement-unit/measurement-unit.model';
import Classification from '../api/item/classification/classification.model';
import StorageLevel from '../api/item/storage-level/storage-level.model';
import UsageFrequency from '../api/item/usage-frequency/usage-frequency.model';
import MaintenanceRequirement from '../api/item/maintenance-requirement/maintenance-requirement.model';
import Discipline from '../api/item/discipline/discipline.model';
import Component from '../api/item/component/component.model';
// MECHANICAL
import Genset from '../api/item/genset/genset.model';
import Item from '../api/item/item/item.model';

import Inventory from '../api/inventory/inventory/inventory.model';
import InventoryHistory from '../api/inventory/inventory-history/inventory-history.model';

import PurchaseOrder from '../api/purchase-order/purchase-order.model';
import Request from '../api/request/request.model';
import Notifications from '../api/notification/notification.model';

import Receiving from '../api/receiving/receiving.model';

import Thing from '../api/thing/thing.model';
import Supplier from '../api/supplier/supplier.model';

Thing.find({}).remove()
  .then(() => {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    });
  });

function generateMeasurementUnits() {
  return MeasurementUnit.find({}).remove()
    .then(() => {
      return MeasurementUnit.create({
        code: 'KGS',
        name: 'Kilograms'
      },{
        code: 'PCS',
        name: 'Pieces'
      });
    });
}

function generateClassifications() {
  return Classification.find({}).remove()
    .then(() => {
      return Classification.create({
        code: 'C',
        name: 'Capital Spares'
      }, {
        code: 'S',
        name: 'Security Spares'
      }, {
        code: 'O',
        name: 'Overhaul Spares'
      }, {
        code: 'W',
        name: 'Wear and Tear Spares'
      });
    });
}

function generateStorageLevels() {
  return StorageLevel.find({}).remove()
    .then(() => {
      return StorageLevel.create({
        code: '1',
        name: 'Level 1'
      }, {
        code: '2',
        name: 'Level 2'
      }, {
        code: '3',
        name: 'Level 3'
      });
    });
}

function generateUsageFrequencies() {
  return UsageFrequency.find({}).remove()
    .then(() => {
      return UsageFrequency.create({
        code: 'F',
        name: 'Fast Moving'
      }, {
        code: 'S',
        name: 'Slow Moving'
      }, {
        code: 'N',
        name: 'Non Moving'
      });
    });
}


function generateDisciplines() {
  return Discipline.find({}).remove()
    .then(() => {
      return Discipline.create({
        code: 'ME',
        name: 'Mechanical Equipment'
      }, {
        code: 'EE',
        name: 'Electrical Equipment'
      }, {
        code: 'IC',
        name: 'Instrumentation and Control'
      });
    });
}

function generateMaintenanceRequirements() {
  return MaintenanceRequirement.find({}).remove()
    .then(() => {
      return MaintenanceRequirement.create({
        code: 'PMS05k',
        description: 'For preventive maintenance activities every 5k hours'
      }, {
        code: 'PMS10k',
        description: 'For preventive maintenance activities every 10k hours'
      }, {
        code: 'PMS15k',
        description: 'For preventive maintenance activities every 15k hours'
      }, {
        code: 'PMS20k',
        description: 'For preventive maintenance activities every 20k hours'
      });
    });
}

function generateComponents() {
  return Component.find({}).remove()
    .then(() => {
      return Component.create({
        code: 'LIMXX-01-PERK0163-001',
        description: 'CRANKSHAFT'
      }, {
        code: 'LIMXX-01-PERK0163-002',
        description: 'ENGINE CASE'
      }, {
        code: 'LIMXX-01-PERK0163-003',
        description: 'RARE ENGINE LID'
      }, {
        code: 'LIMXX-01-PERK0163-004',
        description: 'ENGINE COVER'
      }, {
        code: 'LIMXX-01-PERK0163-004',
        description: 'DEAERATING ENGINE'
      });
    });
}


function generateGensets() {
  return Genset.find({}).remove()
    .then(() => {
      return Genset.create({
        brand: 'Perkins 12'
      }, {
        brand: 'Kubota 12',
        model: 'GV-1120-60-B'
      }, {
        brand: 'Perkins 15',
        model: 'D3.152'
      }, {
        brand: 'Perkins 20',
        model: 'D3.152'
      });
    });
}


function generateItems() {
  return Item.find({}).remove()
    .then(() => {
      return MeasurementUnit.findOne({}).then((measurementUnit) => ({
        measurementUnit: measurementUnit
      }));
    })
    .then((meta) => {
      return Classification.findOne({}).then((classification) => {
        meta.classification = classification;
        return meta;
      });
    })
    .then((meta) => {
      return StorageLevel.findOne({}).then((storageLevel) => {
        meta.storageLevel = storageLevel;
        return meta;
      });
    })
    .then((meta) => {
      return UsageFrequency.findOne({}).then((usageFrequency) => {
        meta.usageFrequency = usageFrequency;
        return meta;
      });
    })
    .then((meta) => {
      return MaintenanceRequirement.findOne({}).then((maintenanceRequirement) => {
        meta.maintenanceRequirement = maintenanceRequirement;
        return meta;
      });
    })
    .then((meta) => {
      return Discipline.findOne({}).then((discipline) => {
        meta.discipline = discipline;
        return meta;
      });
    })
    .then((meta) => {
      return Genset.findOne({}).then((gensetMake) => {
        meta.gensetMake = gensetMake;
        return meta;
      });
    })
    .then((meta) => {
      return Component.findOne({}).then((component) => {
        meta.component = component;
        return meta;
      });
    })
    .then((meta) => {
      return Item.create(
        _.assign({
          code: 'SAMPLE CODE',
          description: 'SAMPLE DESCRIPTION',
          specification: 'SAMPLE SPECIFICATION',
          supplierLedgerCard: 'SAMPLE LEDGER CARD',
          partItemNumber: 'SAMPLE PART ITEM NUMBER',
          manufacturerPartNumber: 'SAMPLE MANUFACTURER PART NUMBER',
          utilityPartNumber: 'SAMPLE UTILITY PART NUMBER',

          componentNumber: 'SAMPLE COMPONENT NUMBER'
        }, meta)
      );
    });
}

function generateInventory(callback) {
  Inventory.find({}).remove()
    .then(() => {
      User.findOne({}).then(user => {
        Item.findOne({}).then(item => {
          Plant.findOne({}).then(plant => {
            var inventory = new Inventory({
              plant: plant._id,
              item: item._id,
              createdBy: user._id,
              value: 10,
              critical: 1
            });
            inventory.save()
              .then(() => {
                if (callback) callback();
              });
          });
        });
      });
    });
}


function generateDepartments() {
  return Department.find({}).remove()
    .then(() => {
      return Department.create({
        code: 'LOD',
        name: 'Luzon Operations Department'
      },{
        code: 'VOD',
        name: 'Visayas Operations Department'
      },{
        code: 'MOD',
        name: 'Mindanao Operations Department'
      });
    });
}

function generateDivisions() {
  return Division.find({}).remove()
    .then(() => {
      return Department.findOne({code: 'VOD'});
    }).then(department => {
      return Division.create({
        department: department,
        code: 'WVOD',
        name: 'Western Visayas Operations Division'
      },{
        department: department,
        code: 'EVOD',
        name: 'Eastern Visayas Operations Division'
      });
    });;
}

function generatePlants(callback) {
  return Plant.find({}).remove()
    .then(() => {
      return Division.findOne({code: 'EVOD'});
    })
    .then((division) => {
      return Plant.create({
        code: 'CAMXX',
        name: 'Camotes Diesel Power Plant',
        division: division,
        location: {
          coordinates: [124.3787452, 10.680833]
        }
      },{
        code: 'ZUMXX',
        name: 'Zumarraga Diesel Power Plant',
        division: division,
        location: {
          coordinates: [124.0981861, 11.7253023]
        }
      },{
        code: 'BATXX',
        name: 'Batag Diesel Power Plant',
        division: division,
        location: {
          coordinates: [124.2767536, 12.4039646]
        }
      },{
        code: 'AMGLN',
        name: 'ALMARGO MINI-GRID: LUNANG DDP',
        division: division,
        location: {
          coordinates: [124.2033952,  12.3751761]
        }
      },{
        code: 'AMGCR',
        name: 'ALMARGO MINI-GRID: COSTA RICA DDP',
        division: division,
        location: {
          coordinates: [124.2033952,  12.3751761]
        }
      },{
        code: 'AMGBS',
        name: 'ALMARGO MINI-GRID: BIASONG DDP',
        division: division,
        location: {
          coordinates: [124.2033952,  12.3751761]
        }
      });
    });
}

function generateUsers() {
  return User.find({}).remove()
    .then(plant => {
      return User.create({
        role: 'superadmin',
        firstName: 'Jose',
        middleInitial: 'P',
        lastName: 'Rizal',
        position: 'Senior IT/IS Specialist',
        mobileNumber: '09xx-xxx-xxxx',
        email: 'superadmin@spug.com',
        password: 'superadmin'
      });
    })
    .then((superadmin) => {
      return Plant.find({})
        .then(plants => ({
          superadmin: superadmin,
          plants: plants
        }));
    })
    .then(({superadmin, plants}) => {
      return User.create({
        role: 'admin',
        firstName: 'Antonio',
        middleInitial: 'P',
        lastName: 'Luna',
        position: 'Division Manager',
        mobileNumber: '09xx-xxx-xxxx',
        email: 'admin@spug.com',
        plant: plants[0],
        password: 'admin',
        createdBy: superadmin,
        lastUpdatedBy: superadmin
      }, {
        firstName: 'Juan',
        middleInitial: 'P',
        lastName: 'Luna',
        position: 'Plant Manager',
        mobileNumber: '09xx-xxx-xxxx',
        email: 'plant1@spug.com',
        plant: plants[0],
        password: 'plant',
        createdBy: superadmin,
        lastUpdatedBy: superadmin
      }, {
        firstName: 'Andres',
        middleInitial: 'P',
        lastName: 'Bonifacio',
        position: 'Plant Manager',
        mobileNumber: '09xx-xxx-xxxx',
        email: 'plant2@spug.com',
        plant: plants[1],
        password: 'plant',
        createdBy: superadmin,
        lastUpdatedBy: superadmin
      });
    });
}

function generatePurchaseOrders(callback) {
  PurchaseOrder.find({}).remove()
    .then(() => {
      // TODO
      if (callback) callback();
    });
}

function generateReceiving(callback) {
  Receiving.find({}).remove()
    .then(() => {
      // TODO
      if (callback) callback();
    });
}

function generateSuppliers(callback) {
  Supplier.find({}).remove()
    .then(() => {
      // TODO
      if (callback) callback();
    });
}

generateSuppliers(function () {
  console.log('finished populating suppliers');
});
generatePurchaseOrders(function () {
  console.log('finished populating purchase-orders');
});
generateReceiving(function () {
  console.log('finished populating receiving');
});

generateDepartments().then(() => {
  console.log('finished populating departments');
  return generateDivisions();
})
.then(() => {
  console.log('finished populating divisions');
  return generatePlants();
})
.then(() => {
  console.log('finished populating plants');
  return generateUsers();
})
.then(() => {
  console.log('finished populating users');
  return generateMeasurementUnits()
})
.then(() => {
  console.log('finished populating measurement-units');
  return generateClassifications()
})
.then(() => {
  console.log('finished populating classifications');
  return generateStorageLevels();
})
.then(() => {
  console.log('finished populating storage-levels');
  return generateUsageFrequencies();
})
.then(() => {
  console.log('finished populating usage-frequency');
  return generateMaintenanceRequirements();
})
.then(() => {
  console.log('finished populating discipline');
  return generateDisciplines();
})
.then(() => {
  console.log('finished populating maintenance-requirement');
  return generateGensets();
})
.then(() => {
  console.log('finished populating genset');
  return generateComponents();
})
.then(() => {
  console.log('finished populating component');
  return generateItems();
})
.then(() => {
  console.log('finished populating items');
  return generateInventory(function () {
    console.log('finished populating inventory');
  });
});






// CLEAR HISTORY

function clearLoginHistory(callback) {
  LoginHistory.find({}).remove()
    .then(() => {
      if (callback) callback();
    });
}

function clearUserHistory(callback) {
  UserHistory.find({}).remove()
    .then(() => {
      // TODO
      if (callback) callback();
    });
}

function clearInventoryHistory(callback) {
  InventoryHistory.find({}).remove()
    .then(() => {
      // TODO
      if (callback) callback();
    });
}

clearLoginHistory(function () {
  console.log("cleared history: login");
});

clearUserHistory(function () {
  console.log("cleared history: user");
});

clearInventoryHistory(function () {
  console.log("cleared history: inventory");
});


// CLEAR TRANSACTIONS

function clearPurchaseOrders(callback) {
  PurchaseOrder.find({}).remove()
    .then(() => {
      // TODO
      if (callback) callback();
    });
}

clearPurchaseOrders(function () {
  console.log("cleared purchase orders");
});

function clearRequests(callback) {
  Request.find({}).remove()
    .then(() => {
      // TODO
      if (callback) callback();
    });
}

clearRequests(function () {
  console.log("cleared requests");
});

function clearNotifications(callback) {
  Notifications.find({}).remove()
    .then(() => {
      // TODO
      if (callback) callback();
    });
}

clearNotifications(function () {
  console.log("cleared notifications");
});
