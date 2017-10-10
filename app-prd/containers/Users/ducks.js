/* eslint no-param-reassign: 0 */

import { createDuck } from 'redux-duck';
import { fromJS } from 'immutable';

const ducks = createDuck('Users');

export const REQUEST = ducks.defineType('REQUEST');
export const REQUEST_SUCCESS = ducks.defineType('REQUEST_SUCCESS');
export const REQUEST_FAILURE = ducks.defineType('REQUEST_FAILURE');
export const DELETE_REQUEST = ducks.defineType('DELETE_REQUEST');
export const DELETE_SUCCESS = ducks.defineType('DELETE_SUCCESS');
export const DELETE_FAILURE = ducks.defineType('DELETE_FAILURE');
export const SAVE_REQUEST = ducks.defineType('SAVE_REQUEST');
export const SAVE_SUCCESS = ducks.defineType('SAVE_SUCCESS');
export const SAVE_FAILURE = ducks.defineType('SAVE_FAILURE');
export const ADD_USER = ducks.defineType('ADD_USER');
export const CHANGE_EDITABLE_USER_RECORD = ducks.defineType(
  'CHANGE_EDITABLE_USER_RECORD',
);

export const request = ducks.createAction(REQUEST);
export const requestSuccess = ducks.createAction(REQUEST_SUCCESS);
export const requestFailure = ducks.createAction(REQUEST_FAILURE);
export const deleteRequest = ducks.createAction(DELETE_REQUEST);
export const deleteSuccess = ducks.createAction(DELETE_SUCCESS);
export const deleteFailure = ducks.createAction(DELETE_FAILURE);
export const saveRequest = ducks.createAction(SAVE_REQUEST);
export const saveSuccess = ducks.createAction(SAVE_SUCCESS);
export const saveFailure = ducks.createAction(SAVE_FAILURE);
export const addUser = ducks.createAction(ADD_USER);
export const changeEditableUserRecord = ducks.createAction(
  CHANGE_EDITABLE_USER_RECORD,
);

const emptyUserRecord = {
  id: 0,
  name: '',
  login: '',
  position: '',
  email: '',
  userRole: '',
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
    [ADD_USER]: state =>
      state
        .set('editableUserRecord', emptyUserRecord)
        .updateIn(['data'], users => users.unshift(fromJS(emptyUserRecord))),
    [CHANGE_EDITABLE_USER_RECORD]: (state, { payload }) => {
      const record = state.get('editableUserRecord');
      if (record && record.id === 0 && !payload) {
        state = state.updateIn(['data'], users => users.shift());
      }
      return state.set('editableUserRecord', payload);
    },
    [SAVE_SUCCESS]: state => state.set('editableUserRecord', null),
  },
  initialState,
);
