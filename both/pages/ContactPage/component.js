import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import ContactForm from './containers/ContactForm';

export default class ContactPage extends React.Component {

  static propTypes = {
    pageData: PropTypes.object,
  };

  render() {
    const { pageData } = this.props;
    return pageData
    ? (
      <section className="contact-page">
        <Helmet
          title="Contact | Keystone4 Universal React"
          meta={[
            {
              name: 'description',
              content: `Boilerplate for a keystone4 website using universally rendered React.`
            }
          ]}
        />
        <div className="contact-page__content grid-container">
          <ContactForm />
        </div>
      </section>
    )
    : <div></div>;
  }
}
