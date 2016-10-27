import { createSelector } from 'reselect';

const selectCounterPageDomain = () => (state) => state.counterReducer;


const selectCounterPage = () => createSelector(
  selectCounterPageDomain(),
  (substate) => substate
);

export default selectCounterPage;
export {
  selectCounterPageDomain,
};
