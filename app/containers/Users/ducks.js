/* eslint no-param-reassign: 0 */

import { createDuck } from 'redux-duck';
import { fromJS } from 'immutable';

const ducks = createDuck('Users');

export const REQUEST = ducks.defineType('REQUEST');
export const REQUEST_SUCCESS = ducks.defineType('REQUEST_SUCCESS');
export const REQUEST_FAILURE = ducks.defineType('REQUEST_FAILURE');
export const ADD_USER = ducks.defineType('ADD_USER');
export const CHANGE_EDITABLE_USER_RECORD = ducks.defineType(
  'CHANGE_EDITABLE_USER_RECORD',
);
export const DELETE_REQUEST = ducks.defineType('DELETE_REQUEST');
export const SAVE_REQUEST = ducks.defineType('SAVE_REQUEST');

export const request = ducks.createAction(REQUEST);
export const requestSuccess = ducks.createAction(REQUEST_SUCCESS);
export const requestFailure = ducks.createAction(REQUEST_FAILURE);
export const addUser = ducks.createAction(ADD_USER);
export const changeEditableUserRecord = ducks.createAction(
  CHANGE_EDITABLE_USER_RECORD,
);
export const deleteUserRequest = ducks.createAction(DELETE_REQUEST);
export const saveUserRequest = ducks.createAction(SAVE_REQUEST);

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
    [DELETE_REQUEST]: (state, { payload }) => {
      const editableUserRecord = state.get('editableUserRecord');
      if (editableUserRecord && editableUserRecord.id === payload.id) {
        state = state.set('editableUserRecord', null);
      }
      return state.updateIn(['data'], users =>
        users.filterNot((user) => {
          return user.get('id') === payload.id;
        }),
      );
    },
    [SAVE_REQUEST]: (state) => {
      const editableUserRecord = state.get('editableUserRecord');
      state = state.updateIn(['data'], users =>
        users.update(
          users.findIndex(user => user.get('id') === editableUserRecord.id),
          user => user.merge(editableUserRecord),
        ),
      );
      return state.set('editableUserRecord', null);
    },
  },
  initialState,
);
