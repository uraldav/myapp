/* eslint no-param-reassign: 0 */

import { createDuck } from 'redux-duck';
import { fromJS } from 'immutable';

const ducks = createDuck('Thematics');

export const INPUT_THEMATICS_REQUEST = ducks.defineType(
  'INPUT_THEMATICS_REQUEST',
);
export const INPUT_THEMATICS_SUCCESS = ducks.defineType(
  'INPUT_THEMATICS_SUCCESS',
);
export const INPUT_THEMATICS_FAILURE = ducks.defineType(
  'INPUT_THEMATICS_FAILURE',
);
export const MODEL_THEMATICS_REQUEST = ducks.defineType(
  'MODEL_THEMATICS_REQUEST',
);
export const MODEL_THEMATICS_SUCCESS = ducks.defineType(
  'MODEL_THEMATICS_SUCCESS',
);
export const MODEL_THEMATICS_FAILURE = ducks.defineType(
  'MODEL_THEMATICS_FAILURE',
);
export const ADD_TAG_INPUT_REQUEST = ducks.defineType('ADD_TAG_INPUT_REQUEST');
export const SAVE_TAG_INPUT_REQUEST = ducks.defineType(
  'SAVE_TAG_INPUT_REQUEST',
);
export const DELETE_TAG_INPUT_REQUEST = ducks.defineType(
  'DELETE_TAG_INPUT_REQUEST',
);
export const ADD_THEMATIC_INPUT = ducks.defineType('ADD_THEMATIC_INPUT');
export const SAVE_THEMATIC_INPUT_REQUEST = ducks.defineType(
  'SAVE_THEMATIC_INPUT_REQUEST',
);
export const SAVE_THEMATIC_INPUT_SUCCESS = ducks.defineType(
  'SAVE_THEMATIC_INPUT_SUCCESS',
);
export const SAVE_THEMATIC_INPUT_FAILURE = ducks.defineType(
  'SAVE_THEMATIC_INPUT_FAILURE',
);
export const DELETE_THEMATIC_INPUT_REQUEST = ducks.defineType(
  'DELETE_THEMATIC_INPUT_REQUEST',
);
export const DELETE_THEMATIC_INPUT_SUCCESS = ducks.defineType(
  'DELETE_THEMATIC_INPUT_SUCCESS',
);
export const DELETE_THEMATIC_INPUT_FAILURE = ducks.defineType(
  'DELETE_THEMATIC_INPUT_FAILURE',
);
export const CHANGE_EDITABLE_INPUT_THEMATIC = ducks.defineType(
  'CHANGE_EDITABLE_INPUT_THEMATIC',
);

export const ADD_TAG_MODEL_REQUEST = ducks.defineType('ADD_TAG_MODEL_REQUEST');
export const SAVE_TAG_MODEL_REQUEST = ducks.defineType(
  'SAVE_TAG_MODEL_REQUEST',
);
export const DELETE_TAG_MODEL_REQUEST = ducks.defineType(
  'DELETE_TAG_MODEL_REQUEST',
);
export const ADD_THEMATIC_MODEL = ducks.defineType('ADD_THEMATIC_MODEL');
export const SAVE_THEMATIC_MODEL_REQUEST = ducks.defineType(
  'SAVE_THEMATIC_MODEL_REQUEST',
);
export const SAVE_THEMATIC_MODEL_SUCCESS = ducks.defineType(
  'SAVE_THEMATIC_MODEL_SUCCESS',
);
export const SAVE_THEMATIC_MODEL_FAILURE = ducks.defineType(
  'SAVE_THEMATIC_MODEL_FAILURE',
);
export const DELETE_THEMATIC_MODEL_REQUEST = ducks.defineType(
  'DELETE_THEMATIC_MODEL_REQUET',
);
export const DELETE_THEMATIC_MODEL_SUCCESS = ducks.defineType(
  'DELETE_THEMATIC_MODEL_SUCCESS',
);
export const DELETE_THEMATIC_MODEL_FAILURE = ducks.defineType(
  'DELETE_THEMATIC_MODEL_FAILURE',
);
export const CHANGE_EDITABLE_MODEL_THEMATIC = ducks.defineType(
  'CHANGE_EDITABLE_MODEL_THEMATIC',
);

export const inputThematicsRequest = ducks.createAction(
  INPUT_THEMATICS_REQUEST,
);
export const inputThematicsSuccess = ducks.createAction(
  INPUT_THEMATICS_SUCCESS,
);
export const inputThematicsFailure = ducks.createAction(
  INPUT_THEMATICS_FAILURE,
);
export const modelThematicsRequest = ducks.createAction(
  MODEL_THEMATICS_REQUEST,
);
export const modelThematicsSuccess = ducks.createAction(
  MODEL_THEMATICS_SUCCESS,
);
export const modelThematicsFailure = ducks.createAction(
  MODEL_THEMATICS_FAILURE,
);
export const addTagInputRequest = ducks.createAction(ADD_TAG_INPUT_REQUEST);
export const saveTagInputRequest = ducks.createAction(SAVE_TAG_INPUT_REQUEST);
export const deleteTagInputRequest = ducks.createAction(
  DELETE_TAG_INPUT_REQUEST,
);
export const addThematicInput = ducks.createAction(ADD_THEMATIC_INPUT);
export const saveThematicInputRequest = ducks.createAction(
  SAVE_THEMATIC_INPUT_REQUEST,
);
export const saveThematicInputSuccess = ducks.createAction(
  SAVE_THEMATIC_INPUT_SUCCESS,
);
export const saveThematicInputFailure = ducks.createAction(
  SAVE_THEMATIC_INPUT_FAILURE,
);
export const changeEditableInputThematic = ducks.createAction(
  CHANGE_EDITABLE_INPUT_THEMATIC,
);
export const deleteThematicInputRequest = ducks.createAction(
  DELETE_THEMATIC_INPUT_REQUEST,
);
export const deleteThematicInputSuccess = ducks.createAction(
  DELETE_THEMATIC_INPUT_SUCCESS,
);
export const deleteThematicInputFailure = ducks.createAction(
  DELETE_THEMATIC_INPUT_FAILURE,
);

export const addTagModelRequest = ducks.createAction(ADD_TAG_MODEL_REQUEST);
export const saveTagModelRequest = ducks.createAction(SAVE_TAG_MODEL_REQUEST);
export const deleteTagModelRequest = ducks.createAction(
  DELETE_TAG_MODEL_REQUEST,
);
export const addThematicModel = ducks.createAction(ADD_THEMATIC_MODEL);
export const saveThematicModelRequest = ducks.createAction(
  SAVE_THEMATIC_MODEL_REQUEST,
);
export const saveThematicModelSuccess = ducks.createAction(
  SAVE_THEMATIC_MODEL_SUCCESS,
);
export const saveThematicModelFailure = ducks.createAction(
  SAVE_THEMATIC_MODEL_FAILURE,
);
export const changeEditableModelThematic = ducks.createAction(
  CHANGE_EDITABLE_MODEL_THEMATIC,
);
export const deleteThematicModelRequest = ducks.createAction(
  DELETE_THEMATIC_MODEL_REQUEST,
);
export const deleteThematicModelSuccess = ducks.createAction(
  DELETE_THEMATIC_MODEL_SUCCESS,
);
export const deleteThematicModelFailure = ducks.createAction(
  DELETE_THEMATIC_MODEL_FAILURE,
);

const initialState = fromJS({
  loadingInputThematics: false,
  loadingModelThematics: false,
  editableInputCell: null,
  editableModelCell: null,
  inputThematics: [],
  modelThematics: [],
  editableInputThematic: null,
  editableModelThematic: null,
});

const emptyInputThematic = {
  id: 0,
  name: '',
  words1: [],
  words2: [],
};

const emptyModelThematic = {
  id: 0,
  name: '',
  words1: [],
  words2: [],
};

export default ducks.createReducer(
  {
    [INPUT_THEMATICS_REQUEST]: state =>
      state.setIn(['loadingInputThematics'], true),
    [INPUT_THEMATICS_SUCCESS]: (state, { payload }) =>
      state
        .setIn(['inputThematics'], fromJS(payload))
        .setIn(['loadingInputThematics'], false),
    [INPUT_THEMATICS_FAILURE]: (state, { payload }) =>
      state.setIn(['error'], payload).setIn(['loadingInputThematics'], false),

    [MODEL_THEMATICS_REQUEST]: state =>
      state.setIn(['loadingModelThematics'], true),
    [MODEL_THEMATICS_SUCCESS]: (state, { payload }) => {
      return state
        .setIn(['modelThematics'], fromJS(payload))
        .setIn(['loadingModelThematics'], false);
    },
    [MODEL_THEMATICS_FAILURE]: (state, { payload }) =>
      state.set('error', payload).set('loadingModelThematics', false),

    [ADD_TAG_INPUT_REQUEST]: (state, { payload }) =>
      state.set('editableInputCell', {
        field: payload.field,
        recordId: payload.recordId,
      }),

    [SAVE_TAG_INPUT_REQUEST]: (state, { payload }) => {
      if (payload.value) {
        state = state.updateIn(['inputThematics'], thematics =>
          thematics.update(
            thematics.findIndex(
              thematic => thematic.get('id') === payload.recordId,
            ),
            thematic =>
              thematic.updateIn([payload.field], tags =>
                tags.push(fromJS({ id: 0, word: payload.value })),
              ),
          ),
        );
      }
      return state.set('editableInputCell', null);
    },

    [DELETE_TAG_INPUT_REQUEST]: (state, { payload }) =>
      state.updateIn(['inputThematics'], thematics =>
        thematics.update(
          thematics.findIndex(
            thematic => thematic.get('id') === payload.recordId,
          ),
          thematic =>
            thematic.updateIn([payload.field], tags =>
              tags.filterNot(tag => tag.get('word') === payload.word),
            ),
        ),
      ),

    [ADD_THEMATIC_INPUT]: state =>
      state
        .set('editableInputThematic', emptyInputThematic)
        .updateIn(['inputThematics'], inputThematics =>
          inputThematics.unshift(fromJS(emptyInputThematic)),
        ),
    [SAVE_THEMATIC_INPUT_SUCCESS]: state =>
      state.set('editableInputThematic', null),

    [CHANGE_EDITABLE_INPUT_THEMATIC]: (state, { payload }) => {
      const record = state.get('editableInputThematic');
      if (record && record.id === 0 && !payload) {
        state = state.updateIn(['inputThematics'], thematics =>
          thematics.shift(),
        );
      }
      return state.set('editableInputThematic', payload);
    },
    [DELETE_THEMATIC_INPUT_REQUEST]: (state, { payload }) => {
      const editableInputThematicRecord = state.get('editableInputThematic');
      if (
        editableInputThematicRecord &&
        editableInputThematicRecord.id === payload.id
      ) {
        state = state.set('editableInputThematic', null);
      }
      return state.updateIn(['inputThematics'], thematics =>
        thematics.filterNot((thematic) => {
          return thematic.get('id') === payload.id;
        }),
      );
    },

    [ADD_TAG_MODEL_REQUEST]: (state, { payload }) =>
      (state = state.set('editableModelCell', {
        field: payload.field,
        recordId: payload.recordId,
      })),

    [SAVE_TAG_MODEL_REQUEST]: (state, { payload }) => {
      if (payload.value) {
        state = state.updateIn(['modelThematics'], thematics =>
          thematics.update(
            thematics.findIndex(
              thematic => thematic.get('id') === payload.recordId,
            ),
            thematic =>
              thematic.updateIn([payload.field], tags =>
                tags.push(fromJS({ id: 0, word: payload.value })),
              ),
          ),
        );
      }
      return state.set('editableModelCell', null);
    },

    [DELETE_TAG_MODEL_REQUEST]: (state, { payload }) =>
      state.updateIn(['modelThematics'], thematics =>
        thematics.update(
          thematics.findIndex(
            thematic => thematic.get('id') === payload.recordId,
          ),
          thematic =>
            thematic.updateIn([payload.field], tags =>
              tags.filterNot(tag => tag.get('word') === payload.word),
            ),
        ),
      ),

    [ADD_THEMATIC_MODEL]: state =>
      state
        .set('editableModelThematic', emptyModelThematic)
        .updateIn(['modelThematics'], modelThematics =>
          modelThematics.unshift(fromJS(emptyModelThematic)),
        ),
    [SAVE_THEMATIC_MODEL_SUCCESS]: state =>
      state.set('editableModelThematic', null),

    [CHANGE_EDITABLE_MODEL_THEMATIC]: (state, { payload }) => {
      const record = state.get('editableModelThematic');
      if (record && record.id === 0 && !payload) {
        state = state.updateIn(['modelThematics'], thematics =>
          thematics.shift(),
        );
      }
      return state.set('editableModelThematic', payload);
    },
  },
  initialState,
);
