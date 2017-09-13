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
} from './ducks';
import { editableUserRecordSelector } from './selectors';

export default function* () {
  const watchRequest = yield takeLatest(REQUEST, requestSaga);
  const watchDeleteRequest = yield takeLatest(DELETE_REQUEST, deleteUserSaga);
  const watchCreateRequest = yield takeLatest(SAVE_REQUEST, saveUserSaga);
  yield fork(requestSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watchRequest, watchDeleteRequest, watchCreateRequest);
}

export function* requestSaga() {
  const api = yield getContext('api');
  const { response, error } = yield call(api.users.fetchUsers);

  if (response) {
    yield put(requestSuccess(response));
  } else {
    yield put(requestFailure(error));
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


export function* saveUserSaga() {
  const api = yield getContext('api');
  const userRecord = yield select(editableUserRecordSelector);

  const { response, error } = yield call(api.users.saveUser, userRecord);

  if (response) {
    yield put(saveSuccess(response));
    yield put(request());
  } else {
    yield put(saveFailure(error));
  }
}
