import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';

import globalReducer from '../global-reducer';
import appReducer from './app-reducer';
import { faqPageReducer } from '../pages/FaqPage/reducer';

export default combineReducers({
  globalReducer,
  appReducer,
  faqPageReducer,
  routing: routerReducer,
  reduxAsyncConnect,// must be last
});
