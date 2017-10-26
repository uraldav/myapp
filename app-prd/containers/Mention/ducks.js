import { createDuck } from 'redux-duck';
import { fromJS } from 'immutable';

const ducks = createDuck('Mentions');

export const REQUEST = ducks.defineType('REQUEST');
export const SUCCESS = ducks.defineType('SUCCESS');
export const FAILURE = ducks.defineType('FAILURE');
export const SELECT_RECORD = ducks.defineType('SELECT_RECORD');

export const request = ducks.createAction(REQUEST);
export const success = ducks.createAction(SUCCESS);
export const failure = ducks.createAction(FAILURE);
export const selectRecord = ducks.createAction(SELECT_RECORD);

const initialState = fromJS({
  loading: false,
  data: [],
  selectedRecord: null,
});

export default ducks.createReducer(
  {
    [REQUEST]: state => state.setIn(['loading'], true),
    [SUCCESS]: (state, { payload }) => {
      return state.setIn(['data'], payload).setIn(['loading'], false);
    },
    [FAILURE]: (state, { payload }) =>
      state.setIn(['error'], payload).setIn(['loading'], false),
    [SELECT_RECORD]: (state, { payload }) =>
      state.set('selectedRecord', payload),
  },
  initialState,
);
