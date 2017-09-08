import { createSelector } from 'reselect';

export const usersSelector = state => state.getIn(['users']);

export const dataSelector = createSelector(
  usersSelector,
  users => users.get('data').toJS(),
);

export const editableUserRecordSelector = createSelector(
  usersSelector,
  mentions => mentions.getIn(['editableUserRecord']),
);
