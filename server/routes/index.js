import keystone from 'keystone';
import redirectData from './redirect-data';
import { initLocals } from './middleware';
import { routeAuthFactory } from './util/auth';

const authOn = process.env.SIMPLE_AUTH_ON === 'true';
const authenticatedRoute = routeAuthFactory(authOn);

const importRoutes = keystone.importer(__dirname);

// Load Routes
const controllers = {
  view      : importRoutes('./view'), // view controllers
  ///
  /// APIs
  ///
  login     : importRoutes('./api/login'),
  forms     : importRoutes('./api/forms'),
  actions   : importRoutes('./api/actions'),
  // general
  admin     : importRoutes('./api/admin-commands'),
  page      : importRoutes('./api/page'),
};

// Bind Routes
exports = module.exports = app => {

  // before any route, load in the locals
  keystone.pre('routes', initLocals);

  // redirects
  Object.keys(redirectData)
    .forEach((key) => app.get(`/${key}`, controllers.view.redirect));

  /*****************************************
   *****************************************
    API Routes
   *****************************************
   *****************************************/

  if(authOn) {
    app.post('/api/login',  controllers.login.loginAction);
    app.all('/api/logout', controllers.login.logoutAction);

    // login page view route
    app.get('/login', controllers.view.login)
  }

  app.post('/api/contact',     authenticatedRoute(controllers.forms.contact));
  app.post('/api/site-search', authenticatedRoute(controllers.actions.siteSearch));

  // Page API Routes
  app.all('/api/page',   authenticatedRoute(controllers.page.pageData)); // home page on main site
  app.all('/api/page/*', authenticatedRoute(controllers.page.pageData)); // all other pages

  ///
  /// View routes
  ///

  // main site
  app.get('*', authenticatedRoute(controllers.view.main, '/login'));
};

