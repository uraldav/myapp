import { call, cancel, fork, getContext, put, take, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  INPUT_THEMATICS_REQUEST,
  MODEL_THEMATICS_REQUEST,
  inputThematicsSuccess,
  modelThematicsSuccess,
  inputThematicsFailure,
  modelThematicsFailure,
} from './ducks';

export default function* () {
  const watchInputThematicsRequest = yield takeLatest(INPUT_THEMATICS_REQUEST, requestInputThematicsSaga);
  const watchModelThematicsRequest = yield takeLatest(MODEL_THEMATICS_REQUEST, requestModelThematicsSaga);

  yield fork(requestInputThematicsSaga);
  yield fork(requestModelThematicsSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watchInputThematicsRequest);
  yield cancel(watchModelThematicsRequest);
}

export function* requestInputThematicsSaga() {
  const api = yield getContext('api');

  try {
    const response = yield call(api.thematics.fetchInputThematics);
    yield put(inputThematicsSuccess(response));
  } catch (error) {
    yield put(inputThematicsFailure(error));
  }
}

export function* requestModelThematicsSaga() {
  const api = yield getContext('api');

  try {
    const response = yield call(api.thematics.fetchModelThematics);
    yield put(modelThematicsSuccess(response));
  } catch (error) {
    yield put(modelThematicsFailure(error));
  }
}
