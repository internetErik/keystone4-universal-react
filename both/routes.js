import React from 'react';
import {
  Route,
  IndexRoute,
} from 'react-router';

import App from './app';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={HomePage} />
    <Route path='/about' component={AboutPage} />
  </Route>
);
