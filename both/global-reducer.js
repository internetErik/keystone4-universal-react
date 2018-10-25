import { WINDOW_RESIZED } from './global-constants';

import { isBrowser } from './util/environment-detection';

const initialState = {
  windowSize : {
    width  : isBrowser ? window.innerWidth : 0,
    height : isBrowser ? window.innerHeight : 0,
  },
};

if(isBrowser) {
  window.addEventListener('resize', () => {})
}

const reducer = (state = initialState, action) => {
  const newState = { ...state };
  switch(action.type) {
    case WINDOW_RESIZED:
      newState.windowSize = action.windowSize;
      break;
    default:
      break;
  }
  return newState;
}

export default reducer;
