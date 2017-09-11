/* eslint no-param-reassign: 0 */

import { createDuck } from 'redux-duck';
import { fromJS } from 'immutable';

const ducks = createDuck('PriorityCoefficients');

export const REQUEST = ducks.defineType('REQUEST');
export const REQUEST_SUCCESS = ducks.defineType('REQUEST_SUCCESS');
export const REQUEST_FAILURE = ducks.defineType('REQUEST_FAILURE');
export const CHANGE_EDITABLE_USER_RECORD = ducks.defineType(
  'CHANGE_EDITABLE_USER_RECORD',
);
export const SAVE_REQUEST = ducks.defineType('SAVE_REQUEST');

export const request = ducks.createAction(REQUEST);
export const requestSuccess = ducks.createAction(REQUEST_SUCCESS);
export const requestFailure = ducks.createAction(REQUEST_FAILURE);
export const changeEditableUserRecord = ducks.createAction(
  CHANGE_EDITABLE_USER_RECORD,
);
export const saveUserRequest = ducks.createAction(SAVE_REQUEST);

const emptyUserRecord = {
  id: 0,
  metrics: '',
  formulas: 0,
  attention: 0,
};

const initialState = fromJS({
  loading: false,
  data: [],
  error: null,
  editableUserRecord: null,
});

export default ducks.createReducer(
  {
    [REQUEST]: state => state.setIn(['loading'], true),
    [REQUEST_SUCCESS]: (state, { payload }) => {
      return state.setIn(['data'], fromJS(payload)).setIn(['loading'], false);
    },
    [REQUEST_FAILURE]: (state, { payload }) =>
      state.setIn(['error'], payload).setIn(['loading'], false),
    [CHANGE_EDITABLE_USER_RECORD]: (state, { payload }) =>
      state.set('editableUserRecord', payload),
    [SAVE_REQUEST]: (state) => {
      const editableUserRecord = state.get('editableUserRecord');
      state = state.updateIn(['data'], priorityCoefficients =>
      priorityCoefficients.update(
        priorityCoefficients.findIndex(x => x.get('id') === editableUserRecord.id),
          x => x.merge(editableUserRecord),
        ),
      );
      return state.set('editableUserRecord', null);
    },
  },
  initialState,
);
