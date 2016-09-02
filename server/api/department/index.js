'use strict';

var express = require('express');
var controller = require('./department.controller');
var Plant = require('../plant/plant.controller');
var Division = require('../division/division.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.hasRole('superadmin'), controller.create);
router.put('/:id', auth.hasRole('superadmin'), controller.update);
router.patch('/:id', auth.hasRole('superadmin'), controller.update);
router.delete('/:id', auth.hasRole('superadmin'), controller.destroy);

router.get('/:id/divisions', auth.isAuthenticated(), Division.byDepartment);
router.get('/:id/plants', auth.isAuthenticated(), Plant.byDepartment);

module.exports = router;
