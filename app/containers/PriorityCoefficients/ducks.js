/* eslint no-param-reassign: 0 */

import { createDuck } from 'redux-duck';
import { fromJS } from 'immutable';

const ducks = createDuck('PriorityCoefficients');
export const request = ducks.createAction(REQUEST);
export const REQUEST = ducks.defineType('REQUEST');
export const REQUEST_SUCCESS = ducks.defineType('REQUEST_SUCCESS');
export const REQUEST_FAILURE = ducks.defineType('REQUEST_FAILURE');
export const CHANGE_EDITABLE_RECORD = ducks.defineType(
  'CHANGE_EDITABLE_RECORD',
);
export const SAVE_REQUEST = ducks.defineType('SAVE_REQUEST');
export const SAVE_SUCCESS = ducks.defineType('SAVE_SUCCESS');
export const SAVE_FAILURE = ducks.defineType('SAVE_FAILURE');

export const requestSuccess = ducks.createAction(REQUEST_SUCCESS);
export const requestFailure = ducks.createAction(REQUEST_FAILURE);
export const changeEditableRecord = ducks.createAction(CHANGE_EDITABLE_RECORD);
export const saveRequest = ducks.createAction(SAVE_REQUEST);
export const saveSuccess = ducks.createAction(SAVE_SUCCESS);
export const saveFailure = ducks.createAction(SAVE_FAILURE);

const initialState = fromJS({
  loading: false,
  data: [],
  error: null,
  editableRecord: null,
});

export default ducks.createReducer(
  {
    [REQUEST]: state => state.setIn(['loading'], true),
    [REQUEST_SUCCESS]: (state, { payload }) => {
      return state.setIn(['data'], fromJS(payload)).setIn(['loading'], false);
    },
    [REQUEST_FAILURE]: (state, { payload }) =>
      state.setIn(['error'], payload).setIn(['loading'], false),
    [CHANGE_EDITABLE_RECORD]: (state, { payload }) => {
      if (payload) {
        return state.set('editableRecord', payload);
      }
      return state.set('editableRecord', null);
    },
    [SAVE_SUCCESS]: state => state.set('editableRecord', null),
  },
  initialState,
);
