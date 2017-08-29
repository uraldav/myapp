import { createSelector } from 'reselect';

export const authSelector = state => state.getIn(['auth']);

export const errorSelector = createSelector(
  authSelector,
  auth => auth.getIn(['error']),
);

export const loadingSelector = createSelector(
  authSelector,
  auth => auth.getIn(['loading']),
);

export const loginSelector = createSelector(
  authSelector,
  auth => auth.getIn(['login']),
);

export const passwordSelector = createSelector(
  authSelector,
  auth => auth.getIn(['password']),
);

export const userDataSelector = createSelector(
  authSelector,
  auth => auth.getIn(['userData']),
);

export const tokenSelector = createSelector(
  authSelector,
  auth => auth.getIn(['token']),
);
