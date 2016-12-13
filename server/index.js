'use strict';
require('dotenv').config();
import keystone from 'keystone';
import routes from './routes';

keystone.init({
  'name': 'Keystone Beta',
  'brand': 'Test Brand Name',

  'static': '../public',

  'auto update': true,
  'mongo': process.env.MONGO_URI || 'mongodb://localhost/keystone-beta',
  'cloudinary config':  process.env.CLOUDINARY_CONFIG || {
    cloud_name: 'my-cloud',
    api_key   : 'abc',
    api_secret: '123',
  },
  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': process.env.COOKIE_SECRET || 'changeme',
  'port': process.env.PORT || 3000,
});

keystone.import('./models');

keystone.set('locals', {
  env: keystone.get('env'),
});

keystone.set('routes', routes);

keystone.set('nav', {
  'posts': ['posts', 'post-categories'],
  'users': 'users',
});

keystone.start();
