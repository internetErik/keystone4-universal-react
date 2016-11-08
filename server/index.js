'use strict';
import keystone from 'keystone';
import routes from './routes';

keystone.init({
  'name': 'Keystone Beta',
  'brand': 'FCB Chicago',

  'static': '../public',

  'auto update': true,
  'mongo': 'mongodb://localhost/keystone-beta',
  'cloudinary config':  { cloud_name: 'my-cloud', api_key: 'abc', api_secret: '123' },
  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': 'test',
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
