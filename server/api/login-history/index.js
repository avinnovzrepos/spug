'use strict';

var express = require('express');
var controller = require('./login-history.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);

module.exports = router;
