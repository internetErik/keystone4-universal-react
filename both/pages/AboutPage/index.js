import React from 'react';
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
export default class AboutPage extends React.Component {

  static propTypes = {
    message: React.PropTypes.string.isRequired,
  };

  render() {
    return (
      <section>
        <h1>About Page!</h1>
        <div>
          {this.props.message}
        </div>
      </section>
    );
  }
}
