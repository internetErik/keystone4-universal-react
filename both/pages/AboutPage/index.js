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
  promise: ({ params, helpers, store: { dispatch } }) => {
    return getMessage()
      .then(r => dispatch(getMessageSuccess(r.response)));
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
