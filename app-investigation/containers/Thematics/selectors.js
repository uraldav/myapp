import { createSelector } from 'reselect';

export const thematicsSelector = state => state.getIn(['thematics']);

export const errorSelector = createSelector(thematicsSelector, x =>
  x.getIn(['error']),
);
export const loadingSelector = createSelector(thematicsSelector, x =>
  x.getIn(['loading']),
);
export const dataSelector = createSelector(thematicsSelector, x =>
  x.get('data').toJS(),
);
