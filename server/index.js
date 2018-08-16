require('dotenv').config();
// Require keystone
import keystone from 'keystone';
import { startCronJobs } from './cron';
import { initialCacheLoad } from './cache';

global.__ENV = process.env.NODE_ENV;

process.on('unhandledRejection', err => console.error('Unhandled rejection:', err))

let keystoneInit = {
  'name': 'Keystone4 Universal React',
  'brand': 'Keystone4 Universal React',

  'static': '../public',
  'view engine': 'hbs',
  'mongo': process.env.MONGO_URI || 'mongodb://localhost/keystone4-universal-react',

  'cookie secret': process.env.COOKIE_SECRET,
  'auto update': true,
  'session': true,
  'session store': 'mongo',
  'auth': true,
  'user model': 'User',
  'port': process.env.PORT || 3000,
};

if(process.env.NODE_ENV === 'production') {
  // keystoneInit['ssl port'] = process.env.SSL_PORT || 443;
  // keystoneInit['ssl'] = 'force';
  // keystoneInit['ssl key'] = process.env.SSL_KEY || '/etc/letsencrypt/live/test.org/privkey.pem';
  // keystoneInit['ssl cert'] = process.env.SSL_CERT || '/etc/letsencrypt/live/test.org/fullchain.pem';
  // This automatic letsencrypt isn't working right now
  // keystoneInit['letsencrypt'] = {
  //   email: 'email@test.com',
  //   domains: ['www.test.com', 'test.com'],
  //   register: true,
  //   tos: true,
  // };
}

keystone.init(keystoneInit);

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
  _: require('lodash'),
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
  'pages': [
    'home-pages',
  ],
});

// build cache
initialCacheLoad();

// start cron jobs
startCronJobs();

// Start Keystone to connect to your database and initialise the web server
keystone.start();
