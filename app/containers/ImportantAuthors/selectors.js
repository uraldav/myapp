import { createSelector } from 'reselect';

export const importantAuthorsSelector = state =>
  state.getIn(['importantAuthors']);

export const dataSelector = createSelector(
  importantAuthorsSelector,
  importantAuthors => importantAuthors.get('data').toJS(),
);
