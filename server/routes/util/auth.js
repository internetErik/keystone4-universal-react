/**
 * Produces a route authenticator that is either on or off based on the site's
 * configuration
 * @param  {Bool} authenticationOn Is authentication on?
 * @return {func}                  An controller that either authenticates, or passes right through
 */
export const routeAuthFactory = authenticationOn => (
  authenticationOn
  ? (controller, redirectPath) => (req, res, next) => {
      if(req.session.loggedIn)
        controller(req, res, next);
      else {
        if(redirectPath)
          res.redirect(302, redirectPath);
        else
          res.json({ error : true });
        return;
      }
    }
  : controller => (req, res, next) => controller(req, res, next)
)