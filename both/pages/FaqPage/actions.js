import { GET_FAQS } from './constants';

export const getFaqsAction = faqs => ({
  type : GET_FAQS,
  faqs,
})
