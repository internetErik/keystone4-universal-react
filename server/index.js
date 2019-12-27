require('dotenv').config();
import { Keystone }             from '@keystonejs/keystone';
import { PasswordAuthStrategy } from '@keystonejs/auth-password';
import { MongooseAdapter }      from '@keystonejs/adapter-mongoose';
import { GraphQLApp }           from '@keystonejs/app-graphql';
import { AdminUIApp }           from '@keystonejs/app-admin-ui';

import expressSession from 'express-session';
import connectMongo   from 'connect-mongo';

import { initializeData }      from './initialize-data';
// import { startCronJobs }    from './cron';
import { initialCacheLoad } from './cache';
import { setupModels }      from './models';

process.on('unhandledRejection', err => console.error('Unhandled rejection:', err))

const { NODE_ENV, MONGO_URI, COOKIE_SECRET, PROJECT_NAME, ADMIN_PATH } = process.env;

global.__ENV = NODE_ENV;

const mongoUri = MONGO_URI || `mongodb://localhost/${ PROJECT_NAME }`;

const adapterOptions = { mongoUri };

const MongoStore = connectMongo(expressSession);

const keystone = new Keystone({
  name          : PROJECT_NAME,
  adapter       : new MongooseAdapter(adapterOptions),
  onConnect     : initializeData,
  secureCookies : false,
  cookieSecret  : COOKIE_SECRET || 'qwerty',
  sessionStore  : new MongoStore({ url: mongoUri }),
});

setupModels(keystone);

const authStrategy = keystone.createAuthStrategy({
  type   : PasswordAuthStrategy,
  list   : 'User',
});

const apps = [
  new GraphQLApp(),
  new AdminUIApp({
    adminPath : ADMIN_PATH,
    authStrategy,
    isAccessAllowed: ({ authentication: { item: user, listKey: list } }) => !!user && !!user.isAdmin,
  }),
];

const preparations = apps.map(app => app.prepareMiddleware({ keystone, dev : NODE_ENV === 'dev' }));

module.exports = {
  keystone,
  apps,
  preparations,
};
