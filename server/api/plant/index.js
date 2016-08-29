'use strict';

var express = require('express');
var controller = require('./plant.controller');
var loginHistory = require('../user/login-history/login-history.controller');
var inventory = require('../inventory/inventory/inventory.controller');
var request = require('../request/request.controller');
var purchaseOrder = require('../purchase-order/purchase-order.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.hasRole('superadmin'), controller.create);
router.put('/:id', auth.hasRole('superadmin'), controller.update);
router.patch('/:id', auth.hasRole('superadmin'), controller.update);
router.delete('/:id', auth.hasRole('superadmin'), controller.destroy);

router.get('/:id/login-history', auth.isAuthenticated(), loginHistory.byPlant);
router.get('/:id/inventory', auth.isAuthenticated(), inventory.plant);
router.get('/:id/purchase-orders', auth.isAuthenticated(), purchaseOrder.byPlant);
router.get('/:id/requests', auth.isAuthenticated(), request.toPlant);
router.get('/:id/sent-requests', auth.isAuthenticated(), request.ofPlant);

module.exports = router;
