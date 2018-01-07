import { createSelector } from 'reselect';

const selectPostsPageDomain = () => (state) => state.blogReducer;

const postsPage = () => createSelector(
  selectPostsPageDomain(),
  (substate) => substate
);

export default postsPage;
export {
  selectPostsPageDomain,
};
