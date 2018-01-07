import {
  GET_MESSAGE_SUCCESS,
  GET_MESSAGE_FAILURE,
} from './constants';

const initialState = {
  message: 'loading',
};

export default function reducer(state = initialState, action) {
  const newState = {...state};
  switch(action.type) {
    case GET_MESSAGE_SUCCESS:
      newState.message = action.message;
      break;
  }
  return newState;
};
