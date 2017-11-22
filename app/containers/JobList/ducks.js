import { fromJS } from 'immutable';
import { createDuck } from 'redux-duck';

const ducks = createDuck('JobList');

export const JOBS_REQUEST = ducks.defineType('JOBS_REQUEST');
export const JOBS_REQUEST_SUCCESS = ducks.defineType('JOBS_REQUEST_SUCCESS');
export const JOBS_REQUEST_FAILURE = ducks.defineType('JOBS_REQUEST_FAILURE');

export const jobRequest = ducks.createAction(JOBS_REQUEST);
export const jobRequestSuccess = ducks.createAction(JOBS_REQUEST_SUCCESS);
export const jobRequestFailure = ducks.createAction(JOBS_REQUEST_FAILURE);

const initialState = fromJS({
  jobs: [],
  loadingJobs: false,
});

export default ducks.createReducer(
  {
    [JOBS_REQUEST]: state => state.set('loadingJobs', true),
    [JOBS_REQUEST_SUCCESS]: (state, { payload }) =>
      state.set('loadingJobs', false).set('jobs', fromJS(payload)),
    [JOBS_REQUEST_FAILURE]: state => state.set('loadingJobs'),
  },
  initialState,
);
