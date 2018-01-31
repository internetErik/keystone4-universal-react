import React from 'react';
// import loadable from 'loadable-components';
import App             from './app';
import HomePage        from './pages/HomePage';
import AboutPage       from './pages/AboutPage';
import CounterPage     from './pages/CounterPage';
import BlogLandingPage from './pages/BlogLandingPage';

// can't use this until redux-connect supports loadable components
// const HomePage        = loadable(() => System.import('./pages/HomePage'));
// const AboutPage       = loadable(() => System.import('./pages/AboutPage'));
// const CounterPage     = loadable(() => System.import('./pages/CounterPage'));
// const BlogLandingPage = loadable(() => System.import('./pages/BlogLandingPage'));

const routes = [{
  component: App,
  routes: [
    {
      path : '/',
      exact: true,
      component: HomePage,
    },
    {
      path : '/about',
      component: AboutPage,
    },
    {
      path : '/counter',
      component: CounterPage,
      routes: [
        {
          path : '/counter/:count',
        },
      ],
    },
    {
      path : '/blog',
      component: BlogLandingPage,
    },
  ],
}]

export default routes;
