import React from 'react';

import App from './app';
import HomePage     from './pages/HomePage';
import FaqPage      from './pages/FaqPage';
import ContactPage  from './pages/ContactPage';
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
      path     : '/faqs',
      component: FaqPage,
    },
    {
      path     : '/contact',
      component: ContactPage,
    },
    {
      path     : '*',
      component: NotFoundPage,
    },
  ],
}];

export default routes;
