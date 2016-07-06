'use strict';

var express = require('express');
var controller = require('./purchase-order.controller');
var receiving = require('../receiving/receiving.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.hasRole('superadmin'), controller.index);
router.get('/:id', auth.hasRole('superadmin'), controller.show);
router.post('/', auth.hasRole('superadmin'), controller.create);
router.put('/:id', auth.hasRole('superadmin'), controller.update);
router.patch('/:id', auth.hasRole('superadmin'), controller.update);
router.delete('/:id', auth.hasRole('superadmin'), controller.destroy);

router.get('/user/:id', auth.hasRole('superadmin'), controller.byUser);
router.post('/:id/decline', auth.hasRole('superadmin'), controller.decline);
router.post('/:purchaseOrderId/receive', auth.hasRole('superadmin'), receiving.create);

module.exports = router;
