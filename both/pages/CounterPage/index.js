import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import selectCounterPage from './selector';
import {
  increaseCounter,
  decreaseCounter,
} from './actions';

const mapStateToProps = selectCounterPage();

const actionCreators = {
  increaseCounter,
  decreaseCounter,
};

@connect(mapStateToProps, actionCreators)
export default class CounterPage extends React.Component {

  static propTypes = {
    currentCount: PropTypes.number.isRequired,
  };

  render() {
    return (
    <section>
      <h1>Obligatory Counter Example!</h1>
      <div>
        <button onClick={this.props.increaseCounter}>+</button>
        <button onClick={this.props.decreaseCounter}>-</button>
        {this.props.currentCount}
      </div>
    </section>
    );
  }
}
