import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import selectCounterPage from './selector';
import { asyncConnect } from 'redux-connect';
import {
  increaseCounter,
  decreaseCounter,
} from './actions';

@asyncConnect([{
  key: 'currentCount',
  promise: ({params, helpers}) => {
    console.log("params: ", params);
    const currentCount = params.count || 0;
    return Promise.resolve(currentCount);
  }
}])
class CounterPage extends React.Component {

  fetchData() {}

  render() {
    return (
      <section>
        <h1>Obligatory Counter Example!</h1>
        <Link to={'/'}>Home</Link>
        <Link to={'/about'}>About</Link>
        <div>
          <button onClick={this.props.increaseCounter}>+</button>
          <button onClick={this.props.decreaseCounter}>-</button>
          {this.props.currentCount}
        </div>
      </section>
    );
  }
}

CounterPage.propTypes = {
  currentCount: React.PropTypes.number.isRequired,
};

const mapStateToProps = selectCounterPage();

// these are mapped to props
const actionCreators = {
  increaseCounter,
  decreaseCounter,
};

export { CounterPage };

export default connect(mapStateToProps, actionCreators)(CounterPage);
