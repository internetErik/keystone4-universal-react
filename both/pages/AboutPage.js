import React from 'react';
import fetch from 'isomorphic-fetch';

class AboutPage extends React.Component {

  constructor() {
    super();
    this.state = {
      text: 'Loading',
    };
  }

  componentDidMount() {
    fetch('/api/post')
      .then(r => r.json())
      .then(r => this.setState({ text: r.response }));
  }

  render() {
    return (
      <section>
        <h1>About Page!</h1>
        <div>
          {this.state.text}
        </div>
      </section>
    );
  }
}

export default AboutPage;
