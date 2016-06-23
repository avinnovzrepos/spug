'use strict';

var express = require('express');
var controller = require('./measurement-unit.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('super-admin'), controller.create);
router.put('/:id', auth.hasRole('super-admin'), controller.update);
router.patch('/:id', auth.hasRole('super-admin'), controller.update);
router.delete('/:id', auth.hasRole('super-admin'), controller.destroy);

module.exports = router;
