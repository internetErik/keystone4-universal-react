import React from 'react';
import { Link } from 'react-router';
import { asyncConnect } from 'redux-connect';
import { getMessage } from './api';
import {
  getMessageSuccess,
  getMessageFailure,
} from './actions';

@asyncConnect([{
  key: 'message',
  promise: ({params, helpers, store}) => getMessage(store.dispatcher, getMessageSuccess, getMessageFailure),
}])
class AboutPage extends React.Component {

  render() {
    return (
      <section>
        <h1>About Page!</h1>
        <Link to={'/'}>Home</Link>
        <Link to={'/counter'}>Counter</Link>
        <div>
          loading
        </div>
      </section>
    );
  }
}

export { AboutPage };

export default AboutPage;
