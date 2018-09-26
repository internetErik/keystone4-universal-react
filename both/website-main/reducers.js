import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';

import appReducer from './app-reducer';
import { faqPageReducer } from '../pages/FaqPage/reducer';

export default combineReducers({
  appReducer,
  faqPageReducer,
  routing: routerReducer,
  reduxAsyncConnect,// must be last
});
