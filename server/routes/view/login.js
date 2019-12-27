import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';

import AppLogin from '../../../both/website-login/app-login';

import renderLayout from '../../views/login-layout';

const { ADMIN_PATH } = process.env;

export const loginController = (req, res, next) => {
  // don't block the keystone admin
  if(req.url.indexOf(ADMIN_PATH) === 0) return next();

  // handle redirect if we aren't logged in
  if(req.session.loggedIn) {
    res.redirect(302, '/');
    return;
  }

  // generate a string that we will render to the page
  const html = renderToString(<AppLogin />);

  // get values for head: title, meta tags
  const head = Helmet.renderStatic();

  // render the page, and send it to the client
  res.send(renderLayout(head, html, 'login', {}, !!(req.user && req.user.isAdmin)))
};
