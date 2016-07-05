'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import * as history from '../user-history/user-history.controller';
import * as loginHistory from '../login-history/login-history.controller';
import * as auth from '../../../auth/auth.service';

var router = new Router();

router.get('/me', auth.isAuthenticated(), controller.me);

router.get('/', auth.hasRole('admin'), controller.index);
router.post('/', auth.hasRole('admin'), controller.create);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id/history', auth.isAuthenticated(), history.byUser);
router.get('/:id/login-history', auth.isAuthenticated(), loginHistory.byUser);

module.exports = router;
