import { createDuck } from 'redux-duck';
import { fromJS } from 'immutable';

const ducks = createDuck('Thematics');

export const INPUT_THEMATICS_REQUEST = ducks.defineType('INPUT_THEMATICS_REQUEST');
export const INPUT_THEMATICS_SUCCESS = ducks.defineType('INPUT_THEMATICS_SUCCESS');
export const INPUT_THEMATICS_FAILURE = ducks.defineType('INPUT_THEMATICS_FAILURE');
export const MODEL_THEMATICS_REQUEST = ducks.defineType('MODEL_THEMATICS_REQUEST');
export const MODEL_THEMATICS_SUCCESS = ducks.defineType('MODEL_THEMATICS_SUCCESS');
export const MODEL_THEMATICS_FAILURE = ducks.defineType('MODEL_THEMATICS_FAILURE');

export const inputThematicsRequest = ducks.createAction(INPUT_THEMATICS_REQUEST);
export const inputThematicsSuccess = ducks.createAction(INPUT_THEMATICS_SUCCESS);
export const inputThematicsFailure = ducks.createAction(INPUT_THEMATICS_FAILURE);
export const modelThematicsRequest = ducks.createAction(MODEL_THEMATICS_REQUEST);
export const modelThematicsSuccess = ducks.createAction(MODEL_THEMATICS_SUCCESS);
export const modelThematicsFailure = ducks.createAction(MODEL_THEMATICS_FAILURE);

const initialState = fromJS({
  loadingInputThematics: false,
  loadingModelThematics: false,
  inputThematics: [],
  modelThematics: [],
});

export default ducks.createReducer({
  [INPUT_THEMATICS_REQUEST]: state =>
    state.setIn(['loadingInputThematics'], true),
  [INPUT_THEMATICS_SUCCESS]: (state, { payload }) => {
    return state.setIn(['inputThematics'], payload)
                .setIn(['loadingInputThematics'], false);
  },
  [INPUT_THEMATICS_FAILURE]: (state, { payload }) =>
    state.setIn(['error'], payload)
         .setIn(['loadingInputThematics'], false),

  [MODEL_THEMATICS_REQUEST]: state =>
    state.setIn(['loadingModelThematics'], true),
  [MODEL_THEMATICS_SUCCESS]: (state, { payload }) => {
    return state.setIn(['modelThematics'], payload)
                .setIn(['loadingModelThematics'], false);
  },
  [MODEL_THEMATICS_FAILURE]: (state, { payload }) =>
    state.setIn(['error'], payload)
         .setIn(['loadingModelThematics'], false),
}, initialState);
