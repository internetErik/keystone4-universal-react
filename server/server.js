import express from 'express';
import { keystone, apps } from './index.js';

import { setupRoutes } from './routes';

keystone
.prepare({ apps, dev: process.env.NODE_ENV === 'dev' })
.then(async ({ middlewares }) => {
  await keystone.connect();

  const app = express();

  setupRoutes(app);

  app.use(middlewares)
  .listen(process.env.PORT || 3000);
});
