/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

import User from '../api/user/user.model';
import LoginHistory from '../api/login-history/login-history.model';

import Plant from '../api/plant/plant.model';

import MeasurementUnit from '../api/measurement-unit/measurement-unit.model';
import Item from '../api/item/item.model';

import Inventory from '../api/inventory/inventory.model';
import InventoryHistory from '../api/inventory-history/inventory-history.model';

import PurchaseOrder from '../api/purchase-order/purchase-order.model';

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

function generateMeasurementUnits(callback) {
  MeasurementUnit.find({}).remove()
    .then(() => {
      MeasurementUnit.create({
        name: 'kg(s)',
        description: 'Kilograms'
      },{
        name: 'pc(s)',
        description: 'Pieces'
      })
      .then(() => {
        if (callback) callback();
      });
    });
}

function generateItems(callback) {
  Item.find({}).remove()
    .then(() => {
      Item.create({
        code: '111111',
        name: 'SAMPLE MECHANICAL FROM SEED',
        partNumber: 'SAMPLE PART NUMBER',
        specification: 'SAMPLE SPECIFICATION',
        unitOfMeasurement: 'SAMPLE UNIT OF MEASUREMENT',
        unitCost: 100,
        year: '2016',
        categoryId: 'CATEGORY ID',
        componentId: 'COMPONENT ID',
        other: 0,

        mechanical: 'M',
        brand: 'SAMPLE BRAND',
        capacity: 'SAMPLE CAPACITY',
        mechanicalSpares: 'SAMPLE MECHANICAL SPARES'
      })
      .then(() => {
        if (callback) callback();
      });
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
              createdBy: user._id
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

function generatePlants(callback) {
  Plant.find({}).remove()
    .then(() => {
      Plant.create({
        name: 'Central Office',
        description: 'Metro manila central office'
      },{
        name: 'Region 3 Warehouse',
        description: 'Central luzon warehouse'
      },{
        name: 'Malolos Plant',
        description: 'Malolos Bulacan plant'
      },{
        name: 'Calumpit Plant',
        description: 'Calumpit Bulacan plant'
      })
      .then(() => {
        if (callback) callback();
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

function generateUsers(callback) {
  Plant.find({}).then(plants => {
    User.find({}).remove()
      .then(() => {
        User.create({
          role: 'plant',
          plant: plants[3]._id,
          name: 'Test Plant 1',
          email: 'plant1@spug.com',
          password: 'plant1'
        }, {
          role: 'plant',
          plant: plants[2]._id,
          name: 'Test Manager',
          email: 'plant@spug.com',
          password: 'plant'
        }, {
          role: 'warehouse',
          plant: plants[1]._id,
          name: 'Test Warehouse',
          email: 'warehouse@spug.com',
          password: 'warehouse'
        }, {
          role: 'admin',
          plant: plants[0]._id,
          name: 'Test Admin',
          email: 'admin@spug.com',
          password: 'admin'
        }, {
          role: 'superadmin',
          name: 'Test Super Admin',
          email: 'superadmin@spug.com',
          password: 'superadmin'
        })
        .then(() => {
          if (callback) callback();
        });
      });
  });
}


function generateSuppliers(callback) {
  Supplier.find({}).remove()
    .then(() => {
      // TODO
      if (callback) callback();
    });
}

generateMeasurementUnits(function () {
  console.log('finished populating measurement-units');
});
generateSuppliers(function () {
  console.log('finished populating suppliers');
});
generatePurchaseOrders(function () {
  console.log('finished populating purchase-orders');
});
generateReceiving(function () {
  console.log('finished populating receiving');
});
generatePlants(function () {
  console.log('finished populating plants');
  generateUsers(function () {
    console.log('finished populating users');
    generateItems(function () {
      console.log('finished populating items');
      generateInventory(function () {
        console.log('finished populating inventory');
      });
    });
  });
});





// CLEAR HISTORY

function clearLoginHistory(callback) {
  LoginHistory.find({}).remove()
    .then(() => {
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
