import keystone from 'keystone';
import redirectData from './redirect-data';
import { initLocals } from './middleware';

const importRoutes = keystone.importer(__dirname);

// Load Routes
const controllers = {
  view      : importRoutes('./view'), // view controllers
  ///
  /// APIs
  ///
  forms     : importRoutes('./api/forms'),
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

   app.post('/api/contact', controllers.forms.contact);

  // Page API Routes
  app.all('/api/page',   controllers.page.pageData); // home page on main site
  app.all('/api/page/*', controllers.page.pageData); // all other pages

  ///
  /// View routes
  ///

  // main site
  app.get('*', controllers.view.main);
};

