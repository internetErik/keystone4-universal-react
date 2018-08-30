import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import renderRoutes from 'react-router-config/renderRoutes'

import Lightbox from './blocks/Lightbox';
import ErrorBoundary from './containers/ErrorBoundary';
import Header        from './global/Header';
import Footer        from './global/Footer';
import SiteBody      from './global/SiteBody';

const mapStateToProps = state => (console.log(state.appReducer),{
  lightboxConfig: state.appReducer.lightboxConfig,
})

@connect(mapStateToProps)
export default class App extends React.Component {

  static propTypes = {
    route          : PropTypes.object.isRequired,
    history        : PropTypes.object.isRequired,
    lightboxConfig : PropTypes.object.isRequired,
  };

  render() {
    const { route, history, lightboxConfig } = this.props;

    return(
    <ErrorBoundary>
      <section className="app c-dark-gray w100% oh">
        <Header className="posr z1" />
        <SiteBody className="posr z2">
          { renderRoutes(route.routes) }
        </SiteBody>
        <Footer className="posr z1" />
        <Lightbox
          className="z3"
          lightboxConfig={lightboxConfig}
        />
      </section>
    </ErrorBoundary>
    );
  }
}
