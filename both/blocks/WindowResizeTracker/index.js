import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { debounce } from '../../util/debounce';

import { windowResizedAction } from '../../global-actions';

const mapDispatchToProps = dispatcher => ({
  windowResized : () => dispatcher(windowResizedAction()),
})

@connect(()=>({}), mapDispatchToProps)
export default class WindowResizeTracker extends React.Component {
  static propTypes = {
    children      : PropTypes.object.isRequired,
    //
    windowResized : PropTypes.func.isRequired,
  }

  resizeTrigger = ()=>{}

  componentDidMount() {
    this.windowResized = debounce(this.props.windowResized.bind(this), 100);
    window.addEventListener('resize', this.windowResized);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResized);
  }

  render() {
    <React.Fragment>
    { children }
    </React.Fragment>
  }
}