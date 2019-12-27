import redirectData from './redirect-data';
import { initLocals } from './middleware';
import { routeAuthFactory } from './util/auth';

import { viewControllers } from './view';
import { apiControllers } from './api';

const { SIMPLE_AUTH_ON } = process.env;
const authenticatedRoute = routeAuthFactory(!!SIMPLE_AUTH_ON);

// Load Routes
const controllers = {
  view: viewControllers, // view controllers
  ///
  /// APIs
  ///
  ...apiControllers,
};

// Bind Routes
export const setupRoutes = app => {

  // before any route, load in the locals
  // keystone.pre('routes', initLocals);

  // redirects
  Object.keys(redirectData)
  .forEach(key => app.get(`/${ key }`, controllers.view.redirect));

  /*****************************************
   *****************************************
    API Routes
   *****************************************
   *****************************************/

  if(!!SIMPLE_AUTH_ON) {
    app.post('/api/login',  controllers.authorizationControllers.loginController);
    app.all('/api/logout', controllers.authorizationControllers.logoutController);

    // login page view route
    app.get('/login', controllers.view.loginController);
  }

  // app.post('/api/contact',     authenticatedRoute(controllers.formControllers.contactController));
  // app.post('/api/site-search', authenticatedRoute(controllers.actionControllers.siteSearchController));

  // Page API Routes
  // app.all('/api/page',   authenticatedRoute(controllers.pageControllers.pageDataController)); // home page on main site
  // app.all('/api/page/*', authenticatedRoute(controllers.pageControllers.pageDataController)); // all other pages

  ///
  /// View routes
  ///

  // main site
  app.get('*', authenticatedRoute(controllers.view.mainController, '/login'));
};

