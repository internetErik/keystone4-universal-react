import React from 'react';
import { hydrate } from 'react-dom';

import AppLogin from '../both/website-login/app-login';

// bring in css
import '../scss/site.scss';

hydrate(
  <AppLogin />,
  document.getElementById('app')
);
