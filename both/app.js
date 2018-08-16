import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import renderRoutes from 'react-router-config/renderRoutes'

import LightBox from './blocks/LightBox';
import ErrorBoundary from './containers/ErrorBoundary';
import Header        from './global/Header';
import Footer        from './global/Footer';
import SiteBody      from './global/SiteBody';

const mapStateToProps = state => ({
  lightBoxConfig: state.appReducer.lightBoxConfig,
})

@connect(mapStateToProps)
export default class App extends React.Component {

  static propTypes = {
    route          : PropTypes.object.isRequired,
    history        : PropTypes.object.isRequired,
    lightBoxConfig : PropTypes.object.isRequired,
  };

  render() {
    const { route, history, lightBoxConfig } = this.props;

    return(
    <ErrorBoundary>
      <section className="app c-dark-gray w100% oh">
        <Header className="posr z1" />
        <SiteBody className="posr z2">
          { renderRoutes(route.routes) }
        </SiteBody>
        <Footer className="posr z1" />
        <LightBox
          className="z3"
          lightBoxConfig={lightBoxConfig}
        />
      </section>
    </ErrorBoundary>
    );
  }
}
