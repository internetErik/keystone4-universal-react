import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import AccordionGroup from '../../containers/AccordionGroup';

export default class FaqPage extends React.Component {

  constructor(props) {
    super();
    this.state = {
      faqs : props.faqs.map(({_id, question, answer }) => ({
        id             : _id,
        headingMessage : question,
        open           : false,
        children       : (
          <div id={`faq-answer-${_id}`} className="grid-container clearfix">
            <div dangerouslySetInnerHTML={{__html: answer}}></div>
          </div>
        ),
      })),
    }
  }

  static propTypes = {
    pageData : PropTypes.object,
    faqs     : PropTypes.array.isRequired,
  };

  render() {
    const { pageData } = this.props;
    const { faqs } = this.state;
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
        <div className="faq-page__content grid-container">
          <AccordionGroup accordionContent={faqs} />
        </div>
      </section>
    )
    : <div></div>;
  }
}
