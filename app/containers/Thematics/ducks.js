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

const initialState = fromJS({
  loadingInputThematics: false,
  loadingModelThematics: false,
  editableCell: null,
  inputThematics: [],
  modelThematics: [],
});

const emptyTag = {
  id: 0,
  word: '',
};

export default ducks.createReducer(
  {
    [INPUT_THEMATICS_REQUEST]: state =>
      state.setIn(['loadingInputThematics'], true),
    [INPUT_THEMATICS_SUCCESS]: (state, { payload }) => {
      return state
        .setIn(['inputThematics'], fromJS(payload))
        .setIn(['loadingInputThematics'], false);
    },
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
      state.setIn(['error'], payload).setIn(['loadingModelThematics'], false),

    [ADD_TAG_INPUT_REQUEST]: (state, { payload }) =>
      (state = state.set('editableCell', {
        field: payload.field,
        recordId: payload.recordId,
      })),

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
      return state.set('editableCell', null);
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
  },
  initialState,
);
