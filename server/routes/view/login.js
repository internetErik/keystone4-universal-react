import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';

import AppLogin from '../../../both/website-login/app-login';

import renderLayout from '../../views/login-layout';

exports = module.exports = (request, response) => {

  // handle redirect if we aren't logged in
  if(request.session.loggedIn) {
    response.redirect(302, '/');
    return;
  }

  // generate a string that we will render to the page
  const html = renderToString(<AppLogin />);

  // get values for head: title, meta tags
  const head = Helmet.renderStatic();

  // render the page, and send it to the client
  response.send(renderLayout(head, html, 'login', {}, !!(request.user && request.user.isAdmin)))
};
