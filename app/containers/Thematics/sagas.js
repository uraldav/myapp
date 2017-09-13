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

  yield take(LOCATION_CHANGE);
  yield cancel(
    watchInputThematicsRequest,
    watchModelThematicsRequest,
    watchSaveInputThematicRequest,
    watchSaveModelThematicRequest,
    watchDeleteInputThematicRequest,
    watchDeleteModelThematicRequest,
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

export function* deleteInputThematicSaga(inputThematic) {
  const api = yield getContext('api');

  const { response, error } = yield call(
    api.thematics.deleteInputThematic,
    inputThematic,
  );
  if (response) {
    yield put(deleteThematicInputSuccess(response));
  } else {
    yield put(deleteThematicInputFailure(error));
  }
}

export function* deleteModelThematicSaga(modelThematic) {
  const api = yield getContext('api');

  const { response, error } = yield call(
    api.thematics.deleteModelThematic,
    modelThematic,
  );
  if (response) {
    yield put(deleteThematicModelSuccess(response));
  } else {
    yield put(deleteThematicModelFailure(error));
  }
}
