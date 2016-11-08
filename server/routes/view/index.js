'use strict';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from '../../../both/routes';
import renderLayout from '../../views/layout';
import reducers from '../../../both/reducers';
import {
  ReduxAsyncConnect,
  loadOnServer,
} from 'redux-connect';
import populateData from '../../data';

exports = module.exports = (request, response) => {
  // match against front-end route
  match(
    { routes, location: request.url },
    (error, redirectLocation, renderProps) => {
      if (error)
        response.status(500).send(err.message);
      else if (redirectLocation)
        response.redirect(redirect.pathname + redirect.search);
      else if (renderProps) {
        // initialize a store for rendering app
        const store = createStore(reducers);
        // load data out of keystone's interface to mongo
        populateData(request.url).then((data) => {
          // wait for all components to finish async requests
          loadOnServer({...renderProps, store}).then(() => {
            // generate a string that we will render to the page
            const html = renderToString(
              <Provider store={store}>
                <ReduxAsyncConnect {...renderProps} />
              </Provider>
            );
            // render the page, and send it to the client
            response.send(renderLayout(html, store.getState()));
          });
        });
      }
      else
        response.status(404).send('Not Found');
    });
};
