'use strict';
import { createSelector } from 'reselect';

const selectAboutPageDomain = () => (state) => state.aboutReducer;

const aboutPage = () => createSelector(
  selectAboutPageDomain(),
  (substate) => substate
);

export default aboutPage;
export {
  selectAboutPageDomain,
};
