'use strict';

var express = require('express');
var controller = require('./purchase-order.controller');
var receiving = require('../receiving/receiving.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.get('/:id', auth.hasRole('admin'), controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

router.get('/user/:id', auth.hasRole('admin'), controller.byUser);
router.post('/:id/decline', auth.hasRole('admin'), controller.decline);
router.post('/:purchaseOrderId/receive', auth.hasRole('admin'), receiving.create);

module.exports = router;
