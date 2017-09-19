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

export const formattedChangeSelector = createSelector(editableRecordSelector, importantAuthorsSelector, (editableRecord, change) => {
  if (editableRecord !== null && change !== null) {
    return editableRecord
      .change
      .map(chan => ({
        functional: chan.functional,
        value: chan.value,
        name: change
          .find(p => p.functional === chan.functional)
          .name,
      }));
  }
  return [];
});
export const changeSelector = createSelector(
  importantAuthorsSelector,
  change => change.get('change').toJS(),
);
