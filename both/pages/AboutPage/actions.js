import {
  GET_MESSAGE_SUCCESS,
  GET_MESSAGE_FAILURE,
} from './constants';

export const getMessageSuccess = message => ({
  type: GET_MESSAGE_SUCCESS,
  message,
})

export const getMessageFailure = () => ({
  type: GET_MESSAGE_FAILURE
})