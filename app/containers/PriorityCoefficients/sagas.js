import {
  call,
  cancel,
  fork,
  getContext,
  put,
  take,
  takeLatest,
  select,
} from 'redux-saga/effects';

import { LOCATION_CHANGE } from 'react-router-redux';
import { editableRecordSelector } from './selectors';
import {
  REQUEST,
  request,
  requestSuccess,
  requestFailure,
  SAVE_REQUEST,
  saveSuccess,
  saveFailure,
  request,
} from './ducks';

export default function* () {
  const watchRequest = yield takeLatest(REQUEST, requestSaga);
  const watchSave = yield takeLatest(SAVE_REQUEST, saveSaga);
  yield fork(requestSaga);
  yield take(LOCATION_CHANGE);
  yield cancel(watchRequest, watchSave);
}

export function* requestSaga() {
  const api = yield getContext('api');

  const { response, error } = yield call(
    api.priorityCoefficients.fetchPriorityCoefficients,
  );

  if (response) {
    yield put(requestSuccess(response));
  } else {
    yield put(requestFailure(error));
  }
}

export function* saveSaga() {
  const api = yield getContext('api');
  const userRecord = yield select(editableRecordSelector);
  const { response, error } = yield call(
    api.priorityCoefficients.save,
    userRecord,
  );

  if (response) {
    yield put(saveSuccess(response));
    yield put(request());
  } else {
    yield put(saveFailure(error));
  }
}
