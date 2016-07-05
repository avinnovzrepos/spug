'use strict';

var express = require('express');
var controller = require('./inventory-history.controller');
import * as auth from '../../../auth/auth.service';

var router = express.Router();

router.get('/', auth.hasRole('superadmin'), controller.index);
router.get('/:id', auth.hasRole('superadmin'), controller.show);
router.get('/inventory/:inventoryId', auth.hasRole('superadmin'), controller.byInventory);

module.exports = router;
