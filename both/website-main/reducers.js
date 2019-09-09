import { combineReducers } from 'redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { connectRouter } from 'connected-react-router'

import globalReducer from '../global-reducer';
import appReducer from './app-reducer';
import { faqPageReducer } from '../pages/FaqPage/reducer';
import { isBrowser } from '../util/environment-detection';

export const createRootReducer = history => combineReducers({
  ...(isBrowser ? { router: connectRouter(history) } : {}),
  globalReducer,
  appReducer,
  faqPageReducer,
  reduxAsyncConnect,// must be last
});
