require('dotenv').config();

import { Keystone }             from '@keystonejs/keystone';
import { PasswordAuthStrategy } from '@keystonejs/auth-password';
import { MongooseAdapter }      from '@keystonejs/adapter-mongoose';
import { GraphQLApp }           from '@keystonejs/app-graphql';
import { AdminUIApp }           from '@keystonejs/app-admin-ui';

import { startCronJobs }    from './cron';
import { initialCacheLoad } from './cache';
import { setupModels }      from './models';

process.on('unhandledRejection', err => console.error('Unhandled rejection:', err))

global.__ENV = process.env.NODE_ENV;
const PROJECT_NAME = 'keystone5-universal-react';

const adapterOptions = {
  MONGODB_URI : process.env.MONGO_URI || 'mongodb://localhost/keystone5-universal-react',
}

const keystone = new Keystone({
  name    : PROJECT_NAME,
  adapter : new MongooseAdapter(adapterOptions),
});

setupModels(keystone);

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
  config: {
    identityField : 'email',
    secretField   : 'password',
  },
});

const apps = [
  new GraphQLApp(),
  new AdminUIApp({ enableDefaultRoute : true, authStrategy }),
];

module.exports = {
  keystone,
  apps,
};
