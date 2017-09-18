import { createSelector } from 'reselect';

export const importantAuthorsSelector = state =>
  state.getIn(['importantAuthors']);

export const dataSelector = createSelector(importantAuthorsSelector, Authors =>
  Authors.get('data').toJS(),
);
export const errorSelector = createSelector(importantAuthorsSelector, Authors =>
  Authors.getIn(['error']),
);

export const loadingSelector = createSelector(
  importantAuthorsSelector,
  Authors => Authors.getIn(['loading']),
);

export const editableRecordSelector = createSelector(
  importantAuthorsSelector,
  Authors => Authors.getIn(['editableRecord']),
);
