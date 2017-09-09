import { call, cancel, fork, getContext, put, take, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  REQUEST,
  DELETE_REQUEST,
  CREATE_REQUEST,
  requestSuccess,
  requestFailure,
  deleteSuccess,
  deleteFailure,
  createSuccess,
  createFailure,
} from './ducks';

export default function* () {
  const watchRequest = yield takeLatest(REQUEST, requestSaga);
  const watchDeleteRequest = yield takeLatest(DELETE_REQUEST, deleteUserSaga);
  const watchCreateRequest = yield takeLatest(CREATE_REQUEST, deleteUserSaga);
  yield fork(requestSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watchRequest, watchDeleteRequest, watchCreateRequest);
}

export function* requestSaga() {
  const api = yield getContext('api');

  try {
    const response = yield call(api.users.fetchUsers);
    yield put(requestSuccess(response));
  } catch (error) {
    yield put(requestFailure(error));
  }
}


export function* deleteUserSaga() {
  const api = yield getContext('api');
  try {
    const response = yield call(api.users.deleteUsers);
    yield put(deleteSuccess(response));
  } catch (error) {
    yield put(deleteFailure(error));
  }
}

export function* createUserSaga(userRecord) {
  const api = yield getContext('api');
  try {
    const response = yield call(api.users.createUser, userRecord);
    yield put(createSuccess(response));
  } catch (error) {
    yield put(createFailure);
  }
}
