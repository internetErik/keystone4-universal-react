import keystone from 'keystone';
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

exports = module.exports = (request, response) => {
  match(
    { routes, location: request.url },
    (error, redirectLocation, renderProps) => {
      if (error)
        response.status(500).send(err.message);
      else if (redirectLocation)
        response.redirect(redirect.pathname + redirect.search);
      else if (renderProps) {
        const store = createStore(reducers);
        loadOnServer({...renderProps, store}).then(() => {
          const html = renderToString(
            <Provider store={store}>
              <ReduxAsyncConnect {...renderProps} />
            </Provider>
          );
          const initialState = store.getState();
          response.send(renderLayout(html, initialState));
        });
      }
      else
        response.status(404).send('Not Found');
    });
};
