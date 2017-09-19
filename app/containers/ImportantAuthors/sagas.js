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
  const userRecord = yield select(editableRecordSelector);

  const { response, error } = yield call(api.users.saveUser, userRecord);

  if (response) {
    yield put(saveSuccess(response));
    yield put(request());
  } else {
    yield put(saveFailure(error));
  }
}

export function* deleteUserSaga({ payload }) {
  const api = yield getContext('api');
  const { response, error } = yield call(api.users.deleteUser, payload);

  if (response) {
    yield put(deleteSuccess(response));
    yield put(request());
  } else {
    yield put(deleteFailure(error));
  }
}

export function* requestPermissionsSaga() {
  const api = yield getContext('api');
  const { response, error } = yield call(api.userRoles.fetchPermissions);

  if (response) {
    yield put(requestChangeSuccess(response));
  } else {
    yield put(requestChangeFailure(error));
  }
}

