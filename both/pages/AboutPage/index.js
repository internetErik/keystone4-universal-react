import React from 'react';
import { asyncConnect } from 'redux-connect';
import { getMessage } from './api';
import selectAboutPage from './selector';
import {
  getMessageSuccess,
  getMessageFailure,
} from './actions';


const mapStateToProps = selectAboutPage();

@asyncConnect([{
  promise: ({params, helpers, store}) => {
    return getMessage(store.dispatcher, getMessageSuccess, getMessageFailure)
  },
}], mapStateToProps)
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
