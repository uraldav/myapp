import { createSelector } from 'reselect';

export const jobListSelector = gstate => gstate.get('jobList');

export const jobsSelector = createSelector(jobListSelector, x =>
  x.get('jobs').toJS());

export const loadingJobsSelector = createSelector(jobListSelector, x =>
  x.get('loadingJobs'));
