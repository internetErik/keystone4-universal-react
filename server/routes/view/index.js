import keystone from 'keystone';
import React from 'react';
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from '../../../both/routes';
import renderLayout from '../../views/layout.js';

exports = module.exports = (request, response) => {
  match(
    { routes, location: request.url },
    (error, redirectLocation, renderProps) => {
      if (error)
        response.status(500).send(err.message);
      else if (redirectLocation)
        response.redirect(redirect.pathname + redirect.search);
      else if(renderProps) {
        const html = renderToString(<RouterContext {...renderProps} />);
        const props = JSON.stringify({
          title: 'Universal React',
        });
        response.send(renderLayout(html, props));
      }
      else
        response.status(404).send('Not Found');
    });
};
