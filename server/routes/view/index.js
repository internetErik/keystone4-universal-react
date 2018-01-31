'use strict';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router/StaticRouter';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import { parse as parseUrl } from 'url';
import serialize from 'serialize-javascript';
import { getLoadableState } from 'loadable-components/server';
import routes from '../../../both/routes';
import reducers from '../../../both/reducers';
import renderLayout from '../../views/layout';
import populateData from '../../data';

exports = module.exports = (req, res) => {
  const url = req.originalUrl || req.url;
  const location = parseUrl(url);

  populateData(req.url, req.query).then((data) => {
    const store = createStore(reducers);
    loadOnServer({ store, location, routes, data }).then(() => {
      const context = {};
      const html = renderToString(
        <Provider store={store}>
          <StaticRouter location={location} context={context}>
            <ReduxAsyncConnect routes={routes} />
          </StaticRouter>
        </Provider>
      );

      // handle redirects
      if(context.url) {
        req.header('Location', context.url)
        return res.send(302)
      }

      // render the page, and send it to the client
      res.send(renderLayout(html, '', store.getState(), !!(req.user && req.user.isAdmin)))

      // render the page, and send it to the client
      // can't use until redux-connect works with loadable-components
      // getLoadableState(html).then(pageScripts =>
      //   res.send(renderLayout(html, pageScripts.getScriptTag(), store.getState(), !!(req.user && req.user.isAdmin)))
      // )
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).end();
  });
};
