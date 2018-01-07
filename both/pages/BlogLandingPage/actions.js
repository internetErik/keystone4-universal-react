import {
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
} from './constants';

export const getPostsSuccess = posts => ({
  type: GET_POSTS_SUCCESS,
  posts,
})

export const getPostsFailure = () => ({
  type: GET_POSTS_FAILURE
})