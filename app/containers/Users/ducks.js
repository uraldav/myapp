import { createDuck } from 'redux-duck';
import { fromJS } from 'immutable';

const ducks = createDuck('Users');

export const REQUEST = ducks.defineType('REQUEST');
export const REQUEST_SUCCESS = ducks.defineType('REQUEST_SUCCESS');
export const REQUEST_FAILURE = ducks.defineType('REQUEST_FAILURE');

export const request = ducks.createAction(REQUEST);
export const requestSuccess = ducks.createAction(REQUEST_SUCCESS);
export const requestFailure = ducks.createAction(REQUEST_FAILURE);

const initialState = fromJS({
  loading: false,
  data: [],
  error: null,
});

export default ducks.createReducer({
  [REQUEST]: state =>
    state.setIn(['loading'], true),
  [REQUEST_SUCCESS]: (state, { payload }) => {
    return state.setIn(['data'], fromJS(payload))
                .setIn(['loading'], false);
  },
  [REQUEST_FAILURE]: (state, { payload }) =>
    state.setIn(['error'], fromJS(payload))
         .setIn(['loading'], false),
}, initialState);
