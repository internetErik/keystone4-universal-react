import React from 'react';

import App from './app';
import HomePage     from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

const routes = [{
  component: App,
  routes: [
    {
      path     : '/',
      exact    : true,
      component: HomePage,
    },
    {
      path     : '*',
      component: NotFoundPage,
    },
  ],
}];

export default routes;
