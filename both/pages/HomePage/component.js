import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

export default class HomePage extends React.Component {

  static propTypes = {
    pageData: PropTypes.object,
  };

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
          Hello World
        </div>
      </section>
    )
    : <div></div>;
  }
}
