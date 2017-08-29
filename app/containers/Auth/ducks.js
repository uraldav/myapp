import { createDuck } from 'redux-duck';
import { fromJS } from 'immutable';

const ducks = createDuck('Auth');

export const REQUEST = ducks.defineType('REQUEST');
export const SUCCESS = ducks.defineType('SUCCESS');
export const FAILURE = ducks.defineType('FAILURE');

export const request = ducks.createAction(REQUEST);
export const success = ducks.createAction(SUCCESS);
export const failure = ducks.createAction(FAILURE);

const initialState = fromJS({
  userData: null,
  loading: false,
  login: null,
  password: null,
  token: null,
});

export default ducks.createReducer({
  [REQUEST]: (state, { payload }) => {
    return state.setIn(['loading'], true)
    .setIn(['login'], payload.login)
    .setIn(['password'], payload.password);
  },
  [SUCCESS]: (state, { payload }) =>
    state.setIn(['userData'], payload.userData)
         .setIn(['token'], payload.token)
         .setIn(['loading'], false),
  [FAILURE]: (state, { payload }) =>
    state.setIn(['error'], payload.error)
         .setIn(['loading'], false),
}, initialState);
