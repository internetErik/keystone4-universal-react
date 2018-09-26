/**
 * Produces a route authenticator that is either on or off based on the site's
 * configuration
 * @param  {Bool} authenticationOn Is authentication on?
 * @return {func}                  An controller that either authenticates, or passes right through
 */
export const routeAuthFactory = authenticationOn => (
  authenticationOn
  ? (controller, redirectPath) => (req, res) => {
      if(req.session.loggedIn)
        controller(req, res);
      else {
        if(redirectPath)
          res.redirect(301, redirectPath);
        else
          res.json({ error : true });
        return;
      }
    }
  : controller => (req, res) => controller(req, res)
)