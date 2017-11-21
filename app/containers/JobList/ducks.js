import { fromJS } from 'immutable';
import { createDuck } from 'redux-duck';

const ducks = createDuck('JobList');

const JOBS_REQUEST = ducks.defineType('JOBS_REQUEST');
const JOBS_REQUEST_SUCCESS = ducks.defineType('JOBS_REQUEST_SUCCESS');
const JOBS_REQUEST_FAILURE = ducks.defineType('JOBS_REQUEST_FAILURE');

export const jobRequest = ducks.createAction(JOBS_REQUEST);
export const jobRequestSuccess = ducks.createAction(JOBS_REQUEST_SUCCESS);
export const jobRequestFailure = ducks.createAction(JOBS_REQUEST_FAILURE);

const initialState = {
  jobs: [],
  loadingJobs: false,
};

export default ducks.createReducer(
  {
    [JOBS_REQUEST]: state => state.set('loadingJobs', true),
    [JOBS_REQUEST_SUCCESS]: (state, { payload }) =>
      state.set('loadingJobs', false).set('jobs', payload),
    [JOBS_REQUEST_FAILURE]: state => state.set('loadingJobs'),
  },
  initialState,
);
