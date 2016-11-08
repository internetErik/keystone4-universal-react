'use strict';
import React from 'react';
import {
  Route,
  IndexRoute,
  Redirect,
} from 'react-router';

import App from './app';
import HomePage from './pages/HomePage/index';
import AboutPage from './pages/AboutPage/index';
import CounterPage from './pages/CounterPage/index';
import BlogLandingPage from './pages/BlogLandingPage/index';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={HomePage} />
    <Route path='/about' component={AboutPage} />
    <Route path="/counter" component={CounterPage}>
      <Route path='/counter/:count' />
    </Route>
    <Route path='/blog' component={BlogLandingPage} />
  </Route>
);
