'use strict';
import {
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
} from './constants';

const initialState = {
  posts: [],
};

export default function reducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  switch(action.type) {
    case GET_POSTS_SUCCESS:
      newState.posts = action.posts;
      break;
  }
  return newState;
};
