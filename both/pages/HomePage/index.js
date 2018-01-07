import React from 'react';

export default class HomePage extends React.Component {

  clickHandler = () => alert()

  render() {
    return (
    <section>
      <button onClick={this.clickHandler}>Click Me!</button>
    </section>
    );
  }
}
