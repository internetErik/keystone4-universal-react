import React from 'react';
import PropTypes from 'prop-types';
import Accordion from './components/Accordion';

export default class AccordionGroup extends React.Component {

  constructor(props) {
    super();
    const { accordionContent } = props;
    this.state = {
      accordions: accordionContent
        ? accordionContent.map(d => (d.open = d.open || false, d))
        : [],
    };
  }

  static propTypes = {
    className       : PropTypes.string,
    accordionContent: PropTypes.arrayOf(
      PropTypes.shape({
        id             : PropTypes.number.isRequired,
        open           : PropTypes.bool.isRequired,
        children       : PropTypes.object.isRequired,
      })
    ).isRequired,
    viewOne         : PropTypes.bool,
  };

  toggleAccordion = accordion => {
    const { viewOne } = this.props;
    const accordions = (viewOne)
      ? this.state.accordions.map(acc => {
          acc.open = (acc.id === accordion.id)
            ? !acc.open
            : false;
          return acc;
        })
      : this.state.accordions.map(acc => {
          acc.open = (acc.id === accordion.id)
            ? !acc.open
            : acc.open;
          return acc;
        });

    this.setState({ accordions });
  }

  render() {
    const { className } = this.props;
    const { accordions } = this.state;
    return (
    <div className={`accordion-group ${className || ''}`}>
    {
    accordions.map((accordion, ndx) =>
      <Accordion
        key={ndx}
        data={accordion}
        toggleAccordion={this.toggleAccordion}
      />
    )
    }
    </div>
    );
  }
}
