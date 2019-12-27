import { siteConfigurationCache } from '../cache/site-configuration';

/**
  Initialises the standard view locals.
  Include anything that should be initialised before route controllers are executed.
*/
export const initLocals = (req, res, next) => {

  let locals = res.locals;

  // set if we are logged in as an admin
  locals.isAdmin = (req.user && req.user.isAdmin)|| false;

  // Add your own local variables here
  locals.siteConfig = siteConfigurationCache.data;

  // if we are on the staged site, then password protect site
  if(siteConfigurationCache.data.passwordProtected && !req.user) {
    res.redirect(302, '/keystone');
  }

  next();
};
