import { createSelector } from 'reselect';
import { createSelector } from 'reselect';

const aboutPageDomain = () => (state) => state.aboutReducer;

const aboutPage = () => createSelector(
  selectCounterPageDomain(),
  (substate) => substate
);

export default aboutPage;
export {
  aboutPageDomain,
};
