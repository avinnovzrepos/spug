/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import Supplier from '../api/supplier/supplier.model';
import MeasurementUnit from '../api/measurement-unit/measurement-unit.model';
import Plant from '../api/plant/plant.model';
import Item from '../api/item/item.model';
import Inventory from '../api/inventory/inventory.model';
import InventoryHistory from '../api/inventory-history/inventory-history.model';
import User from '../api/user/user.model';

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
        code: "111111",
        name: "SAMPLE MECHANICAL FROM SEED",
        partNumber: "SAMPLE PART NUMBER",
        specification: "SAMPLE SPECIFICATION",
        unitOfMeasurement: "SAMPLE UNIT OF MEASUREMENT",
        unitCost: 100,
        year: "2016",
        categoryId: "CATEGORY ID",
        componentId: "COMPONENT ID",
        other: 0,

        mechanical: "M",
        brand: "SAMPLE BRAND",
        capacity: "SAMPLE CAPACITY",
        mechanicalSpares: "SAMPLE MECHANICAL SPARES"
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
        name: 'Ortigas Plant',
        description: 'Ortigas Pasig plant'
      },{
        name: 'Bulacan Plant',
        description: 'Malolos Bulacan plant'
      })
      .then(() => {
        if (callback) callback();
      });
    });
}


function generateInventoryHistory(callback) {
  InventoryHistory.find({}).remove()
    .then(() => {
      // TODO
      if (callback) callback();
    });
}

function generateUsers(callback) {
  Plant.findOne({}).then(plant => {
    User.find({}).remove()
      .then(() => {
        User.create({
          provider: 'local',
          role: 'manager',
          plant: plant._id,
          name: 'Test Manager',
          email: 'manager@spug.com',
          password: 'manager'
        }, {
          provider: 'local',
          role: 'warehouse',
          plant: plant._id,
          name: 'Test Warehouse',
          email: 'warehouse@spug.com',
          password: 'warehouse'
        },{
          provider: 'local',
          role: 'admin',
          plant: plant._id,
          name: 'Test Admin',
          email: 'admin@spug.com',
          password: 'admin'
        }, {
          provider: 'local',
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
  console.log("finished populating measurement-units");
});
generateSuppliers(function () {
  console.log("finished populating suppliers");
});
generatePlants(function () {
  console.log("finished populating plants");
  generateUsers(function () {
    console.log("finished populating users");
    generateItems(function () {
      console.log("finished populating items");
      generateInventoryHistory(function () {
        console.log("finished populating inventory-history");
      });
      generateInventory(function () {
        console.log("finished populating inventory");
      });
    });
  });
})
