import {
  getContext,
  call,
  takeLatest,
  put,
  fork,
  take,
  cancel,
  select,
} from 'redux-saga/effects';

import { LOCATION_CHANGE } from 'react-router-redux';

import {
  REQUEST,
  DELETE_REQUEST,
  SAVE_REQUEST,
  request,
  requestSuccess,
  requestFailure,
  deleteSuccess,
  deleteFailure,
  saveSuccess,
  saveFailure,
  requestChangeSuccess,
  requestChangeFailure,
} from './ducks';
import { editableRecordSelector } from './selectors';

export default function* () {
  const watchRequest = yield takeLatest(REQUEST, requestSaga);
  const watchDeleteRequest = yield takeLatest(DELETE_REQUEST, deleteUserSaga);
  const watchCreateRequest = yield takeLatest(SAVE_REQUEST, saveSaga);
  yield call(requestChangeSaga);
  yield fork(requestSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watchRequest, watchDeleteRequest, watchCreateRequest);
}

export function* requestSaga() {
  const api = yield getContext('api');

  const { response, error } = yield call(api.importantAuthors.fetchAuthors);

  if (response) {
    yield put(requestSuccess(response));
  } else {
    yield put(requestFailure(error));
  }
}

export function* saveSaga() {
  const api = yield getContext('api');
  const record = yield select(editableRecordSelector);

  const { response, error } = yield call(
    api.importantAuthors.saveAuthors,
    record,
  );

  if (response) {
    yield put(saveSuccess(response));
    yield put(request());
  } else {
    yield put(saveFailure(error));
  }
}

export function* deleteUserSaga({ payload }) {
  const api = yield getContext('api');
  const { response, error } = yield call(
    api.importantAuthors.deleteAuthors,
    payload,
  );

  if (response) {
    yield put(deleteSuccess(response));
    yield put(request());
  } else {
    yield put(deleteFailure(error));
  }
}

export function* requestChangeSaga() {
  const api = yield getContext('api');
  const { response, error } = yield call(api.importantAuthors.fetchChanges);

  if (response) {
    yield put(requestChangeSuccess(response));
  } else {
    yield put(requestChangeFailure(error));
  }
}
