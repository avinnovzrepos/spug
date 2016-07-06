'use strict';

var express = require('express');
var controller = require('./notification.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/:id/read', auth.isAuthenticated(), controller.read);

module.exports = router;
