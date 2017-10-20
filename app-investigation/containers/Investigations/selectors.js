import { createSelector } from 'reselect';

export const investigationsSelector = state => state.getIn(['investigations']);

export const errorSelector = createSelector(investigationsSelector, x =>
  x.getIn(['error']),
);
export const loadingSelector = createSelector(investigationsSelector, x =>
  x.getIn(['loading']),
);
export const dataSelector = createSelector(investigationsSelector, x =>
  x.get('data').toJS(),
);
export const selectedInvestigationSelector = createSelector(
  investigationsSelector,
  x => x.get('selectedInvestigation'),
);
