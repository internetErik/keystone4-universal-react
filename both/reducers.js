import { combineReducers } from 'redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import counterReducer from './pages/CounterPage/reducer';

export default combineReducers({
  reduxAsyncConnect,
  counterReducer,
});
