/* eslint no-param-reassign: 0 */
import { fromJS } from 'immutable';
import { createDuck } from 'redux-duck';

const ducks = createDuck('ImportantAuthors');

export const REQUEST = ducks.defineType('REQUEST');
export const REQUEST_SUCCESS = ducks.defineType('REQUEST_SUCCESS');
export const REQUEST_FAILURE = ducks.defineType('REQUEST_FAILURE');
export const REQUEST_CHANGE_SUCCESS = ducks.defineType(
  'REQUEST_CHANGE_SUCCESS',
);
export const REQUEST_CHANGE_FAILURE = ducks.defineType(
  'REQUEST_CHANGE_FAILURE',
);
export const DELETE_REQUEST = ducks.defineType('DELETE_REQUEST');
export const DELETE_SUCCESS = ducks.defineType('DELETE_SUCCESS');
export const DELETE_FAILURE = ducks.defineType('DELETE_FAILURE');
export const SAVE_REQUEST = ducks.defineType('SAVE_REQUEST');
export const SAVE_SUCCESS = ducks.defineType('SAVE_SUCCESS');
export const SAVE_FAILURE = ducks.defineType('SAVE_FAILURE');
export const ADD = ducks.defineType('ADD');
export const CHANGE_EDITABLE_RECORD = ducks.defineType(
  'CHANGE_EDITABLE_RECORD',
);
export const UPDATE_CHANGE_RECORD = ducks.defineType('UPDATE_CHANGE_RECORD');
export const CHANGE_EDITABLE_RECORD_NAME = ducks.defineType(
  'CHANGE_EDITABLE_RECORD_NAME',
);
export const SELECT_EDITABLE_RECORD = ducks.defineType(
  'SELECT_EDITABLE_RECORD',
);

export const request = ducks.createAction(REQUEST);
export const requestSuccess = ducks.createAction(REQUEST_SUCCESS);
export const requestFailure = ducks.createAction(REQUEST_FAILURE);
export const requestChangeSuccess = ducks.createAction(REQUEST_CHANGE_SUCCESS);
export const requestChangeFailure = ducks.createAction(REQUEST_CHANGE_FAILURE);
export const updateChangeRecord = ducks.createAction(UPDATE_CHANGE_RECORD);
export const deleteRequest = ducks.createAction(DELETE_REQUEST);
export const deleteSuccess = ducks.createAction(DELETE_SUCCESS);
export const deleteFailure = ducks.createAction(DELETE_FAILURE);
export const saveRequest = ducks.createAction(SAVE_REQUEST);
export const saveSuccess = ducks.createAction(SAVE_SUCCESS);
export const saveFailure = ducks.createAction(SAVE_FAILURE);
export const add = ducks.createAction(ADD);
export const changeEditableRecord = ducks.createAction(CHANGE_EDITABLE_RECORD);

const initialState = fromJS({
  loading: false,
  data: [],
  error: null,
  record: null,
});

const emptyRecord = {
  id: 0,
  accountName: '',
  socialNetwork: 'None',
  subscribersNumber: 0,
  comment: '',
};

export default ducks.createReducer(
  {
    [REQUEST]: state => state.setIn(['loading'], true),
    [REQUEST_SUCCESS]: (state, { payload }) => {
      return state.setIn(['data'], fromJS(payload)).setIn(['loading'], false);
    },
    [REQUEST_FAILURE]: (state, { payload }) =>
      state.setIn(['error'], payload).setIn(['loading'], false),
    [REQUEST_CHANGE_SUCCESS]: (state, { payload }) => {
      return state
        .setIn(['permissions'], fromJS(payload))
        .setIn(['loading'], false);
    },
    [REQUEST_CHANGE_FAILURE]: (state, { payload }) =>
      state.setIn(['error'], payload).setIn(['loading'], false),
    [UPDATE_CHANGE_RECORD]: (state, { payload }) =>
      state.set('editableRecord', {
        ...state.get('editableRecord'),
        permissions: state
          .get('editableRecord')
          .permissions.map(
            item =>
              item.functional === payload.functional
                ? { ...item, value: payload.value }
                : item,
          ),
      }),
    [ADD]: state =>
      state
        .set('editableRecord', emptyRecord)
        .updateIn(['data'], data => data.unshift(fromJS(emptyRecord))),
    [CHANGE_EDITABLE_RECORD]: (state, { payload }) => {
      const record = state.get('editablRecord');
      if (record && record.id === 0 && !payload) {
        state = state.updateIn(['data'], data => data.shift());
      }
      return state.set('editableRecord', payload);
    },
    [SAVE_SUCCESS]: state => state.set('editableRecord', null),
  },
  initialState,
);
