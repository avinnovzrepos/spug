'use strict';

var express = require('express');
var controller = require('./plant.controller');
var loginHistory = require('../user/login-history/login-history.controller');
var Inventory = require('../inventory/inventory/inventory.controller');
var request = require('../request/request.controller');
var PurchaseOrder = require('../purchase-order/purchase-order.controller');
var Receiving = require('../receiving/receiving.controller');
var Users = require('../user/user/user.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.hasRole('superadmin'), controller.create);
router.put('/:id', auth.hasRole('superadmin'), controller.update);
router.patch('/:id', auth.hasRole('superadmin'), controller.update);
router.delete('/:id', auth.hasRole('superadmin'), controller.destroy);

router.get('/:id/users', auth.isAuthenticated(), Users.plant);
router.get('/:id/login-history', auth.isAuthenticated(), loginHistory.byPlant);
router.get('/:id/inventory', auth.isAuthenticated(), Inventory.plant);
router.get('/:id/purchase-orders', auth.isAuthenticated(), PurchaseOrder.plant);
router.get('/:id/receivings', auth.isAuthenticated(), Receiving.plant);
router.get('/:id/requests', auth.isAuthenticated(), request.toPlant);
router.get('/:id/sent-requests', auth.isAuthenticated(), request.ofPlant);

module.exports = router;
