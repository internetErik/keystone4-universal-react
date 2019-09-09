import { createRootReducer } from './reducers';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, compose } from 'redux';

export const history = createBrowserHistory();

export const configureStore = initialState => {
  const middleware = routerMiddleware(history);

  // Create store with the initial state generated by the server
  const store = createStore(
    createRootReducer(history),
    initialState,
    compose(
      applyMiddleware(middleware)
    ),
  );
  return store;
}
