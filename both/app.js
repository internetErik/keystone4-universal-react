import React from 'react';

const App = (props) =>(
  <section>
    <Link to={'/'}>Home</Link>
    <Link to={'/about'}>About</Link>
    <Link to={'/counter'}>Counter</Link>
    {props.children}
  </section>
);

App.propTypes = {
  children: React.PropTypes.object.isRequired,
}

export default App;
