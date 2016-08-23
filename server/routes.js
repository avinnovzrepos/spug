/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/departments', require('./api/department'));
  app.use('/api/divisions', require('./api/division'));
  app.use('/api/plants', require('./api/plant'));

  app.use('/api/measurement-units', require('./api/item/measurement-unit'));
  app.use('/api/storage-levels', require('./api/item/storage-level'));
  app.use('/api/classifications', require('./api/item/classification'));
  app.use('/api/usage-frequency', require('./api/item/usage-frequency'));
  app.use('/api/maintenance-requirements', require('./api/item/maintenance-requirement'));
  app.use('/api/disciplines', require('./api/item/discipline'));
  app.use('/api/components', require('./api/item/component'));
  // MECHANICAL
  app.use('/api/gensets', require('./api/item/genset'));
  app.use('/api/items', require('./api/item/item'));

  app.use('/api/inventory', require('./api/inventory/inventory'));
  app.use('/api/inventory-history', require('./api/inventory/inventory-history'));

  app.use('/api/users', require('./api/user/user'));
  app.use('/api/user-history', require('./api/user/user-history'));
  app.use('/api/login-history', require('./api/user/login-history'));

  app.use('/api/notifications', require('./api/notification'));
  app.use('/api/purchase-orders', require('./api/purchase-order'));

  app.use('/api/purchase-orders', require('./api/purchase-order'));
  app.use('/api/receiving', require('./api/receiving'));
  app.use('/api/requests', require('./api/request'));
  app.use('/api/suppliers', require('./api/supplier'));

  app.use('/auth', require('./auth').default);

  app.use('/api/things', require('./api/thing'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
