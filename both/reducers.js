'use strict';
import { combineReducers } from 'redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import aboutReducer from './pages/AboutPage/reducer';
import counterReducer from './pages/CounterPage/reducer';

export default combineReducers({
  reduxAsyncConnect,
  aboutReducer,
  counterReducer,
});
