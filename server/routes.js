/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/todos', require('./api/todo'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });

  app.use(function(err, req, res, next) {
    console.log('I am called');
    if (err.name === 'UnauthorizedError') {
      console.log('Catch UnauthorizedError' + err);
      res.redirect('/login');
      next(err);
    }
  });

}