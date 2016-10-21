import React from 'react';
import { Link } from 'react-router';

export default class HomePage extends React.Component {
  constructor() {
    super();
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    alert();
  }

  render() {
    return (
      <section>
        <h1>{this.props.title}</h1>
        <button onClick={this.clickHandler}>Click Me!</button>
        <Link to={'/about'}>About</Link>
      </section>
    );
  }
}
