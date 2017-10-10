import {
  call,
  cancel,
  getContext,
  put,
  take,
  takeLatest,
  select,
} from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  INPUT_THEMATICS_REQUEST,
  MODEL_THEMATICS_REQUEST,
  SAVE_THEMATIC_INPUT_REQUEST,
  SAVE_THEMATIC_MODEL_REQUEST,
  DELETE_THEMATIC_INPUT_REQUEST,
  DELETE_THEMATIC_MODEL_REQUEST,
  DELETE_TAG_INPUT_REQUEST,
  DELETE_TAG_MODEL_REQUEST,
  SAVE_TAG_INPUT_REQUEST,
  SAVE_TAG_MODEL_REQUEST,
  inputThematicsRequest,
  inputThematicsSuccess,
  modelThematicsRequest,
  modelThematicsSuccess,
  inputThematicsFailure,
  modelThematicsFailure,
  saveThematicInputSuccess,
  saveThematicInputFailure,
  saveThematicModelSuccess,
  saveThematicModelFailure,
  deleteThematicInputSuccess,
  deleteThematicInputFailure,
  deleteThematicModelSuccess,
  deleteThematicModelFailure,
  deleteTagInputSuccess,
  deleteTagInputFailure,
  deleteTagModelSuccess,
  deleteTagModelFailure,
  saveTagInputSuccess,
  saveTagInputFailure,
  saveTagModelSuccess,
  saveTagModelFailure,
} from './ducks';
import {
  editableInputThematicSelector,
  editableModelThematicSelector,
} from './selectors';

export default function* () {
  const watchInputThematicsRequest = yield takeLatest(
    INPUT_THEMATICS_REQUEST,
    requestInputThematicsSaga,
  );
  const watchModelThematicsRequest = yield takeLatest(
    MODEL_THEMATICS_REQUEST,
    requestModelThematicsSaga,
  );
  const watchSaveInputThematicRequest = yield takeLatest(
    SAVE_THEMATIC_INPUT_REQUEST,
    saveInputThematicSaga,
  );
  const watchSaveModelThematicRequest = yield takeLatest(
    SAVE_THEMATIC_MODEL_REQUEST,
    saveModelThematicSaga,
  );
  const watchDeleteInputThematicRequest = yield takeLatest(
    DELETE_THEMATIC_INPUT_REQUEST,
    deleteInputThematicSaga,
  );
  const watchDeleteModelThematicRequest = yield takeLatest(
    DELETE_THEMATIC_MODEL_REQUEST,
    deleteModelThematicSaga,
  );
  const watchDeleteTagInputRequest = yield takeLatest(
    DELETE_TAG_INPUT_REQUEST,
    deleteTagInputRequestSaga,
  );
  const watchDeleteTagModelRequest = yield takeLatest(
    DELETE_TAG_MODEL_REQUEST,
    deleteTagModelRequestSaga,
  );
  const watchSaveTagInputRequest = yield takeLatest(
    SAVE_TAG_INPUT_REQUEST,
    saveTagInputRequestSaga,
  );
  const watchSaveTagModelRequest = yield takeLatest(
    SAVE_TAG_MODEL_REQUEST,
    saveTagModelRequestSaga,
  );

  yield take(LOCATION_CHANGE);
  yield cancel(
    watchInputThematicsRequest,
    watchModelThematicsRequest,
    watchSaveInputThematicRequest,
    watchSaveModelThematicRequest,
    watchDeleteInputThematicRequest,
    watchDeleteModelThematicRequest,
    watchDeleteTagInputRequest,
    watchDeleteTagModelRequest,
    watchSaveTagInputRequest,
    watchSaveTagModelRequest,
  );
}

export function* requestInputThematicsSaga() {
  const api = yield getContext('api');

  const { response, error } = yield call(api.thematics.fetchInputThematics);
  if (response) {
    yield put(inputThematicsSuccess(response));
  } else {
    yield put(inputThematicsFailure(error));
  }
}

export function* requestModelThematicsSaga() {
  const api = yield getContext('api');

  const { response, error } = yield call(api.thematics.fetchModelThematics);
  if (response) {
    yield put(modelThematicsSuccess(response));
  } else {
    yield put(modelThematicsFailure(error));
  }
}

export function* saveInputThematicSaga() {
  const api = yield getContext('api');
  const editableInputThematic = yield select(editableInputThematicSelector);

  const { response, error } = yield call(
    api.thematics.saveInputThematic,
    editableInputThematic,
  );
  if (response) {
    yield put(saveThematicInputSuccess(response));
    yield put(inputThematicsRequest());
  } else {
    yield put(saveThematicInputFailure(error));
  }
}

export function* saveModelThematicSaga() {
  const api = yield getContext('api');
  const editableModelThematic = yield select(editableModelThematicSelector);

  const { response, error } = yield call(
    api.thematics.saveModelThematic,
    editableModelThematic,
  );
  if (response) {
    yield put(saveThematicModelSuccess(response));
    yield put(modelThematicsRequest());
  } else {
    yield put(saveThematicModelFailure(error));
  }
}

export function* deleteInputThematicSaga({ payload }) {
  const api = yield getContext('api');

  if (payload.id !== 0) {
    const { response, error } = yield call(
      api.thematics.deleteInputThematic,
      payload,
    );
    if (response) {
      yield put(deleteThematicInputSuccess(payload));
      yield put(inputThematicsRequest());
    } else {
      yield put(deleteThematicInputFailure(error));
    }
  } else {
    yield put(deleteThematicInputSuccess(payload));
  }
}

export function* deleteModelThematicSaga({ payload }) {
  const api = yield getContext('api');

  const { response, error } = yield call(
    api.thematics.deleteModelThematic,
    payload,
  );
  if (response) {
    yield put(deleteThematicModelSuccess(payload));
    yield put(modelThematicsRequest());
  } else {
    yield put(deleteThematicModelFailure(error));
  }
}

export function* deleteTagInputRequestSaga({
  payload: { word, field, recordId },
}) {
  const api = yield getContext('api');

  const { response, error } = yield call(
    api.thematics.deleteTagInputThematic,
    recordId,
    field,
    word,
  );
  if (response) {
    yield put(deleteTagInputSuccess({ word, field, recordId }));
  } else {
    yield put(deleteTagInputFailure(error));
  }
}

export function* deleteTagModelRequestSaga({
  payload: { word, field, recordId },
}) {
  const api = yield getContext('api');

  const { response, error } = yield call(
    api.thematics.deleteTagModelThematic,
    recordId,
    field,
    word,
  );
  if (response) {
    yield put(deleteTagModelSuccess({ word, field, recordId }));
  } else {
    yield put(deleteTagModelFailure(error));
  }
}

export function* saveTagInputRequestSaga({
  payload: { value, field, recordId },
}) {
  const api = yield getContext('api');

  const { response, error } = yield call(
    api.thematics.createTagInputThematic,
    recordId,
    field,
    value,
  );
  if (response) {
    yield put(saveTagInputSuccess({ value, field, recordId }));
  } else {
    yield put(saveTagInputFailure(error));
  }
}

export function* saveTagModelRequestSaga({
  payload: { value, field, recordId },
}) {
  const api = yield getContext('api');

  const { response, error } = yield call(
    api.thematics.createTagModelThematic,
    recordId,
    field,
    value,
  );
  if (response) {
    yield put(saveTagModelSuccess({ value, field, recordId }));
  } else {
    yield put(saveTagModelFailure(error));
  }
}
