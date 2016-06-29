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
      console.log('finished populating users');
    });
  });

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
        console.log('finished populating items');
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
              plant: plant,
              item: item
            });
            inventory.save()
              .then(() => {
                console.log('finished populating inventory');
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
        console.log('finished populating plants');
        if (callback) callback();
      });
    });
}

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      role: 'manager',
      name: 'Test Manager',
      email: 'manager@spug.com',
      password: 'manager'
    }, {
      provider: 'local',
      role: 'warehouse',
      name: 'Test Warehouse',
      email: 'warehouse@spug.com',
      password: 'warehouse'
    },{
      provider: 'local',
      role: 'admin',
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
      console.log('finished populating users');
      generatePlants(function () {
        generateItems(function () {
          generateInventory();
        });
      });
    });
  });

Supplier.find({}).remove().then(() => {
  // TODO
});
