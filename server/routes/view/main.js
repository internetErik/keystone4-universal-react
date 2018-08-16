import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router/StaticRouter';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import { parse as parseUrl } from 'url';
import Helmet from 'react-helmet';

import routes from '../../../both/routes';
import renderLayout from '../../views/layout';
import { setAppInitialState } from '../../../both/app-reducer';
import reducers from '../../../both/reducers';
import populateData from '../../data';

exports = module.exports = (request, response) => {
  const url = request.originalUrl || request.url;
  const location = parseUrl(url);

  // load data out of keystone's interface to mongo
  let [pagePath, ...args] = request.path.split('/').splice(1);
  populateData(pagePath, args, request, response).then(data => {
    // get the site config out of locals, and initialize
    // the appReducer's initial state
    setAppInitialState(response.locals);

    // initialize a store for rendering app
    const store = createStore(reducers);

    // wait for all components to finish async requests
    loadOnServer({ location, routes, store, data }).then(() => {
      const context = {};
      // generate a string that we will render to the page
      const html = renderToString(
        <Provider store={store}>
          <StaticRouter location={location} context={context}>
            <ReduxAsyncConnect routes={routes} />
          </StaticRouter>
        </Provider>
      );

      // handle redirects
      if(context.url) {
        request.header('Location', context.url)
        return response.send(302)
      }

      // get values for head: title, meta tags
      const head = Helmet.renderStatic();

      // render the page, and send it to the client
      response.send(renderLayout(head, html, '', store.getState(), !!(request.user && request.user.isAdmin)))

    })
    .catch(err => {
      console.error(err);
      response.status(500).end();
    });
  })
  .catch(err => {
    console.error(err);
    response.status(500).end();
  });
};
