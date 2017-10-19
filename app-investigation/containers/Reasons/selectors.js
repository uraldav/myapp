import { createSelector } from 'reselect';

export const reasonsSelector = state => state.getIn(['reasons']);

export const errorSelector = createSelector(reasonsSelector, reasons =>
  reasons.getIn(['error']),
);

export const loadingSelector = createSelector(reasonsSelector, reasons =>
  reasons.getIn(['loading']),
);

export const dataSelector = createSelector(reasonsSelector, reasons =>
  reasons.get('data').toJS(),
);
