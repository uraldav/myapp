import { createDuck } from 'redux-duck';
import { fromJS, Map } from 'immutable';

const ducks = createDuck('Auth');

export const REQUEST = ducks.defineType('REQUEST');
export const SUCCESS = ducks.defineType('SUCCESS');
export const FAILURE = ducks.defineType('FAILURE');

export const request = ducks.createAction(REQUEST);
export const success = ducks.createAction(SUCCESS);
export const failure = ducks.createAction(FAILURE);

export const initialState = fromJS({
  userData: null,
  loading: false,
  login: null,
  password: null,
  token: null,
  error: null,
});

export default ducks.createReducer(
  {
    [REQUEST]: (state, { payload }) =>
      state
        .set('loading', true)
        .set('login', payload.login)
        .set('password', payload.password),

    [SUCCESS]: (state, { payload }) =>
      state
        .set('userData', Map(payload.userData))
        .set('token', payload.token)
        .set('loading', false),

    [FAILURE]: (state, { payload }) => {
      return state.set('error', payload.error).set('loading', false);
    },
  },
  initialState,
);
