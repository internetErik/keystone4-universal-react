import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

export default class FaqPage extends React.Component {

  static propTypes = {
    pageData: PropTypes.object,
  };

  render() {
    const { pageData } = this.props;
    return pageData
    ? (
      <section className="faq-page">
        <Helmet
          title="FAQs | Keystone4 Universal React"
          meta={[
            {
              name: 'description',
              content: `Boilerplate for a keystone4 website using universally rendered React.`
            }
          ]}
        />
        <div>
          FAQs
        </div>
      </section>
    )
    : <div></div>;
  }
}
