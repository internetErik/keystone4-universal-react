import { GET_FAQS } from './constants';

const initialState = {
  faqs : [],
}

export const faqPageReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch(action.type) {
    case GET_FAQS:
      newState.faqs = action.faqs;
      break;
    default:
      break;
  }
  return newState;
}
