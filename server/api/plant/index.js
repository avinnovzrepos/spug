'use strict';

var express = require('express');
var controller = require('./plant.controller');
var loginHistory = require('../user/login-history/login-history.controller');
var inventory = require('../inventory/inventory/inventory.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/:id/login-history', auth.isAuthenticated(), loginHistory.byPlant);
router.get('/:id/inventory', auth.isAuthenticated(), inventory.byPlant);
router.post('/', auth.hasRole('superadmin'), controller.create);
router.put('/:id', auth.hasRole('superadmin'), controller.update);
router.patch('/:id', auth.hasRole('superadmin'), controller.update);
router.delete('/:id', auth.hasRole('superadmin'), controller.destroy);

module.exports = router;
