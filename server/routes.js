/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/notifications', require('./api/notification'));
  app.use('/api/purchase-orders', require('./api/purchase-order'));
  app.use('/api/receiving', require('./api/receiving'));
  app.use('/api/requests', require('./api/request'));
  app.use('/api/plants', require('./api/plant'));
  app.use('/api/measurement-units', require('./api/measurement-unit'));
  app.use('/api/suppliers', require('./api/supplier'));
  app.use('/api/items', require('./api/item'));
  app.use('/api/things', require('./api/thing'));

  app.use('/api/inventory', require('./api/inventory/inventory'));
  app.use('/api/inventory-history', require('./api/inventory/inventory-history'));

  app.use('/api/users', require('./api/user/user'));
  app.use('/api/user-history', require('./api/user/user-history'));
  app.use('/api/login-history', require('./api/user/login-history'));

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
