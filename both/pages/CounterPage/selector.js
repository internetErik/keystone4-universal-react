import { createSelector } from 'reselect';

/**
 * Direct selector to the emailBuilderPage state domain
 */
const selectCounterPageDomain = () => (state) => state.counterReducer;


const selectCounterPage = () => createSelector(
  selectCounterPageDomain(),
  (substate) => substate
);

export default selectCounterPage;
export {
  selectCounterPageDomain,
};
