import { combineReducers } from 'redux';
import appReducer from './app-reducer';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';

export default combineReducers({
  appReducer,
  routing: routerReducer,
  reduxAsyncConnect,// must be last
});
