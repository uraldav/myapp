import { createSelector } from 'reselect';

export const usersSelector = state => state.getIn(['users']);

export const errorSelector = createSelector(
  usersSelector,
  users => users.getIn(['error']),
);

export const loadingSelector = createSelector(
  usersSelector,
  users => users.getIn(['loading']),
);

export const userDataSelector = createSelector(
  usersSelector,
  users => users.getIn(['data']),
);

