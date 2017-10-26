import { createSelector } from 'reselect';

export const mentionsSelector = state => state.getIn(['mentions']);

export const mentionsDataSelector = createSelector(mentionsSelector, mentions =>
  mentions.getIn(['data']).toJS(),
);

export const loadingSelector = createSelector(mentionsSelector, mentions =>
  mentions.getIn(['loading']),
);

export const selectedRecordSelector = createSelector(
  mentionsSelector,
  mentions => mentions.getIn(['selectedRecord']),
);
