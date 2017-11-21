import { createSelector } from 'reselect';

export const jobListSelector = state => state.getIn(['jobList']);

export const jobsListItemsSelector = createSelector(jobListSelector, app =>
  app.get('jobs').toJS());

export const jobListLoadingSelector = createSelector(jobListSelector, app =>
  app.get('loadingJobs').toJS());
