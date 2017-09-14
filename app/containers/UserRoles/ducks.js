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
export const CHANGE_EDITABLE_RECORD_NAME = ducks.defineType(
  'CHANGE_EDITABLE_RECORD_NAME',
);
export const SELECT_EDITABLE_RECORD = ducks.defineType(
  'SELECT_EDITABLE_RECORD',
);
export const UPDATE_EDITABLE_RECORD_PERMISSION = ducks.defineType(
  'UPDATE_EDITABLE_RECORD_PERMISSION',
);
export const DELETE_USER_ROLE_REQUEST = ducks.defineType(
  'DELETE_USER_ROLE_REQUEST',
);
export const ADD_USER_ROLE = ducks.defineType('ADD_USER_ROLE');
export const SAVE_USER_ROLE = ducks.defineType('SAVE_USER_ROLE');
export const CHANGE_EDITABLE_RECORD = ducks.defineType(
  'CHANGE_EDITABLE_RECORD',
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
export const changeEditableRecordName = ducks.createAction(CHANGE_EDITABLE_RECORD_NAME);
export const selectEditableRecord = ducks.createAction(SELECT_EDITABLE_RECORD);
export const updateEditableRecordPermission = ducks.createAction(
  UPDATE_EDITABLE_RECORD_PERMISSION,
);
export const deleteUserRoleRequest = ducks.createAction(
  DELETE_USER_ROLE_REQUEST,
);
export const addUserRole = ducks.createAction(ADD_USER_ROLE);
export const saveUserRole = ducks.createAction(SAVE_USER_ROLE);
export const changeEditableRecord = ducks.createAction(CHANGE_EDITABLE_RECORD);

const initialState = fromJS({
  loading: false,
  permissions: [],
  data: [],
  editableRecord: null,
  isEditing: false,
});

const emptyUserRole = {
  id: 0,
  name: '',
  permissions: [
    {
      functional: 1,
      value: 0,
    },
    {
      functional: 2,
      value: 0,
    },
    {
      functional: 3,
      value: 0,
    },
    {
      functional: 4,
      value: 0,
    },
    {
      functional: 5,
      value: 0,
    },
    {
      functional: 6,
      value: 0,
    },
    {
      functional: 7,
      value: 0,
    },
    {
      functional: 8,
      value: 0,
    },
    {
      functional: 9,
      value: 0,
    },
    {
      functional: 10,
      value: 0,
    },
  ],
};

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

    [SELECT_EDITABLE_RECORD]: (state, { payload }) =>
      state.set(
        'editableRecord',
        state
          .get('data')
          .find(role => role.get('id') === payload.id)
          .toJS(),
      ),

    [UPDATE_EDITABLE_RECORD_PERMISSION]: (state, { payload }) =>
      state.set('editableRecord', {
        ...state.get('editableRecord'),
        permissions: state
          .get('editableRecord')
          .permissions.map(
            item =>
              (item.functional === payload.functional
                ? { ...item, value: payload.value }
                : item),
          ),
      }),

    [DELETE_USER_ROLE_REQUEST]: (state) => {
      state = state.updateIn(['data'], roles =>
        roles.filterNot(
          role => role.get('id') === state.get('editableRecord').id,
        ),
      );
      return state.set('editableRecord', state.get('data').first().toJS());
    },

    [ADD_USER_ROLE]: (state) => {
      state = state.updateIn(['data'], users => users.unshift(fromJS(emptyUserRole)));
      state = state.set('isEditing', true);
      return state.set('editableRecord', state.get('data').first().toJS());
    },

    [SAVE_USER_ROLE]: (state) => {
      const editableModelThematic = state.get('editableRecord');
      state = state.updateIn(['data'], users =>
        users.update(
          users.findIndex(user => user.get('id') === editableModelThematic.id),
          user => user.merge(editableModelThematic),
        ),
      );
      return state.set('isEditing', false);
    },

    [CHANGE_EDITABLE_RECORD]: (state, { payload }) => {
      const record = state.get('editableRecord');
      if (record && record.id === 0 && !payload) {
        state = state.updateIn(['data'], data => data.shift());
      }
      return state.set('editableRecord', payload);
    },

    [CHANGE_EDITABLE_RECORD_NAME]: (state, { payload }) => {
      const record = state.get('editableRecord');
      if (record) record.role_name = payload.role_name;
      return state.set('editableRecord', record);
    },
  },
  initialState,
);
