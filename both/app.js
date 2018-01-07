import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import renderRoutes from 'react-router-config/renderRoutes'

const App = ({ route }) => (
<section>
  <Link to={'/'}>
    {'Home'}
  </Link>
  <Link to={'/about'}>
    {'About'}
  </Link>
  <Link to={'/counter'}>
    {'Counter'}
  </Link>
  <Link to={'/blog'}>
    {'Blog'}
  </Link>
  {renderRoutes(route.routes)}
</section>
);

App.propTypes = {
  route: PropTypes.object.isRequired,
}

export default App;
