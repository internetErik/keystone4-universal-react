import {
  GET_MESSAGE_SUCCESS,
  GET_MESSAGE_FAILURE,
} from './constants';

export function getMessageSuccess(message) {
  return {
    type: GET_MESSAGE_SUCCESS,
    message,
  };
}

export  function getMessageFailure() {
  return {
    type: GET_MESSAGE_FAILURE
  }
}