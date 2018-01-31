import { combineReducers } from 'redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import aboutReducer from './pages/AboutPage/reducer';
import counterReducer from './pages/CounterPage/reducer';
import blogReducer from './pages/BlogLandingPage/reducer';
import { routerReducer } from 'react-router-redux';
export default combineReducers({
  aboutReducer,
  counterReducer,
  blogReducer,
  routing: routerReducer,
  reduxAsyncConnect,
});
