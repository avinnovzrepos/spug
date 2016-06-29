'use strict';

var express = require('express');
var controller = require('./inventory.controller');
var inventoryHistory = require('../inventory-history/inventory-history.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('superadmin'), controller.create);
router.put('/:id', auth.hasRole('superadmin'), controller.update);
router.patch('/:id', auth.hasRole('superadmin'), controller.update);
router.delete('/:id', auth.hasRole('superadmin'), controller.destroy);

router.get('/:inventoryId/history', auth.hasRole('superadmin'), inventoryHistory.byInventory);

module.exports = router;
