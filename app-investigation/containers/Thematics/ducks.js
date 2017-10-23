import { createDuck } from 'redux-duck';
import { fromJS } from 'immutable';

const ducks = createDuck('Thematics');

export const THEMATICS_REQUEST = ducks.defineType('THEMATICS_REQUEST');
export const THEMATICS_REQUEST_SUCCESS = ducks.defineType(
  'THEMATICS_REQUEST_SUCCESS',
);
export const THEMATICS_REQUEST_FAILURE = ducks.defineType(
  'THEMATICS_REQUEST_FAILURE',
);

export const thematicsRequest = ducks.createAction(THEMATICS_REQUEST);
export const thematicsRequestSuccess = ducks.createAction(
  THEMATICS_REQUEST_SUCCESS,
);
export const thematicsRequestFailure = ducks.createAction(
  THEMATICS_REQUEST_FAILURE,
);

const initialState = fromJS({
  loading: false,
  data: [],
  error: null,
});

export default ducks.createReducer(
  {
    [THEMATICS_REQUEST]: state => state.setIn(['loading'], true),
    [THEMATICS_REQUEST_SUCCESS]: (state, { payload }) =>
      state.setIn(['data'], fromJS(payload)).setIn(['loading'], false),
    [THEMATICS_REQUEST_FAILURE]: (state, { payload }) =>
      state.setIn(['error'], payload).setIn(['loading'], false),
  },
  initialState,
);
