import React from 'react';
import PropTypes from 'prop-types';

let updateHeight = ()=>{}

export default class Accordion extends React.Component {

  constructor() {
    super();

    this.state = {
      currentStyle: { height: '0' },
    };
  }

  height = 0;

  static propTypes = {
    data           : PropTypes.object.isRequired,
    toggleAccordion: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeHandler)
    this.resizeHandler();
    updateHeight = this.updateHeight;
  }

  static getDerivedStateFromProps(props, state) {
    let currentStyle = updateHeight();
    return { ...state, currentStyle };
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler)
  }

  resizeHandler = ()=> {
    this.height = this.childElements.getBoundingClientRect().height;
    this.props.data.height = this.height;
    let currentStyle = this.updateHeight();
    this.setState({ currentStyle })
  }

  updateHeight = () => {
    const { data: { open, height } } = this.props;
    const currentStyle = (open)
      ? { height: `${height}px` }
      : { height: '0'};
    return currentStyle;
  }

  toggleAccordion = () => {
    this.resizeHandler();
    this.props.toggleAccordion(this.props.data);
  }

  render() {
    const { data: { id, headingMessage, open, children, subHeadingMessage } } = this.props;
    const { currentStyle } = this.state;
    return (
    <div className={`accordion posr`}>
      <div
        ref={content => this.childElements = content}
        className="accordion__content-measure posa l150% w100%"
      >
        {children}
      </div>
      <div
        onClick={this.toggleAccordion}
        className={`accordion__header p10-0 bt1-s-lightgray curp pl20@md`}
      >
        <div className="grid-container posr">
          <div className={`${open ? 'c-black' : ''}`}>
            {headingMessage}
          </div>
          {subHeadingMessage &&
          <div className="c-gray ffss">{subHeadingMessage}</div>
          }
          <span className={`posa center-vert r0 h24 w24 bgc-white round-element r16@lg`}>
            <span className={`posa center fw700 ${open ? 'dn' : '' }`}>+</span>
            <span className={`posa center fw700 ${open ? '' : 'dn' }`}>&ndash;</span>
          </span>
        </div>
      </div>
      <div
        className={`accordion__content transition-all oh ${open ? 'm10-0' : ''}`}
        style={currentStyle}
      >
        {children}
      </div>
    </div>
    );
  }
}