'use strict';
import {
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
} from './constants';

export function getPostsSuccess(posts) {
  return {
    type: GET_POSTS_SUCCESS,
    posts,
  };
}

export  function getPostsFailure() {
  return {
    type: GET_POSTS_FAILURE
  }
}