'use strict';
import keystone from 'keystone';
import routes from './routes';

keystone.init({
  'name': 'Keystone Beta',
  'brand': 'FCB Chicago',

  'static': 'public',

  'auto update': true,
  'mongo': 'mongodb://localhost/keystone-beta',

  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': 'test',
});

keystone.import('./models');

keystone.set('routes', routes);

keystone.start();
