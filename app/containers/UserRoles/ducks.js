/* eslint no-param-reassign: 0 */

import { createDuck } from 'redux-duck';
import { fromJS } from 'immutable';

const ducks = createDuck('Users');

export const REQUEST = ducks.defineType('REQUEST');
export const REQUEST_SUCCESS = ducks.defineType('REQUEST_SUCCESS');
export const REQUEST_FAILURE = ducks.defineType('REQUEST_FAILURE');

export const REQUEST_PERMISSIONS_SUCCESS = ducks.defineType(
  'REQUEST_PERMISSIONS_SUCCESS',
);
export const REQUEST_PERMISSIONS_FAILURE = ducks.defineType(
  'REQUEST_PERMISSIONS_FAILURE',
);
export const CHANGE_EDITABLE_RECORD = ducks.defineType(
  'CHANGE_EDITABLE_RECORD',
);
export const SELECT_EDITABLE_RECORD = ducks.defineType(
  'SELECT_EDITABLE_RECORD',
);

export const request = ducks.createAction(REQUEST);
export const requestSuccess = ducks.createAction(REQUEST_SUCCESS);
export const requestFailure = ducks.createAction(REQUEST_FAILURE);

export const requestPermissionsSuccess = ducks.createAction(
  REQUEST_PERMISSIONS_SUCCESS,
);
export const requestPermissionsFailure = ducks.createAction(
  REQUEST_PERMISSIONS_FAILURE,
);
export const changeEditableRecord = ducks.createAction(CHANGE_EDITABLE_RECORD);
export const selectEditableRecord = ducks.createAction(SELECT_EDITABLE_RECORD);

const initialState = fromJS({
  loading: false,
  permissions: [],
  data: [],
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

    [REQUEST_PERMISSIONS_SUCCESS]: (state, { payload }) => {
      return state
        .setIn(['permissions'], fromJS(payload))
        .setIn(['loading'], false);
    },
    [REQUEST_PERMISSIONS_FAILURE]: (state, { payload }) =>
      state.setIn(['error'], payload).setIn(['loading'], false),
    [CHANGE_EDITABLE_RECORD]: (state, { payload }) => {
      const record = state.get('editableRecord');
      if (record && record.id === 0 && !payload) {
        state = state.updateIn(['data'], data => data.shift());
      }
      return state.set('editableRecord', payload);
    },
    [SELECT_EDITABLE_RECORD]: (state, { payload }) =>
      state.set(
        'editableRecord',
        state.get('data').find(role => role.get('id') === payload.id).toJS(),
      ),
  },
  initialState,
);
