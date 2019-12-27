import express from 'express';
import expressSession from 'express-session';
import bodyParser from 'body-parser';

import { keystone, apps, preparations } from './index.js';
import { setupRoutes } from './routes';

const session = {
  secret : 'keyboard cat',
  cookie : {}
}

Promise.all(preparations)
.then(async middlewares => {
  await keystone.connect();

  const app = express();

  app.use(expressSession(session));

  setupRoutes(app);

  app.use(middlewares)
  .listen(process.env.PORT || 3000);
});
