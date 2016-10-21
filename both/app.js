import React from 'react';

const App = (props) =>(
  <section>
    This is the App.js!
    {props.children}
  </section>
);

App.propTypes = {
  children: React.PropTypes.object.isRequired,
}

export default App;
