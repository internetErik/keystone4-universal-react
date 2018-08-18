import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

export default class HomePage extends React.Component {

  static propTypes = {
    pageData      : PropTypes.object,
    openLightbox  : PropTypes.func.isRequired,
    closeLightbox : PropTypes.func.isRequired,
  };

  openLightbox = () => {
    const { openLightbox, closeLightbox } = this.props;
    const lightBoxConfig = {
      close: closeLightbox,
      open: true,
      children: (
      <div className="posa center bgc-white p10">
        This is a lightbox. <button className="p10 bd1-s-black" onClick={closeLightbox}>Close</button>
      </div>
      ),
      backgroundClassName: 'bgc-black-.5a',
    }
    openLightbox(lightBoxConfig);
  }

  render() {
    const { pageData } = this.props;
    return pageData
    ? (
      <section className="home-page">
        <Helmet
          title="Keystone4 Universal React"
          meta={[
            {
              name: 'description',
              content: `Boilerplate for a keystone4 website using universally rendered React.`
            }
          ]}
        />
        <div className="home-page__content grid-container">
          Hello World <button onClick={this.openLightbox} className="p10 bd1-s-black">Open Lightbox</button>
        </div>
      </section>
    )
    : <div></div>;
  }
}
