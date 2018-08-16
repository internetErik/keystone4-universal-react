import React from 'react';
import PropTypes from 'prop-types'

export default class RenderOnClientOnly extends React.Component {
  constructor() {
    super();
    this.state = {
      render: false
    }
  }

  static propTypes = {
    className : PropTypes.string,
    children  : PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.setState({ render: true });
  }

  render() {
    const { className, children } = this.props;
    const { render } = this.state;
    return (
    <div className={`render-on-client-only ${className || ''}`}>
      {render && children }
    </div>
    );
  }
}
