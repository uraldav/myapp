import { call, cancel, fork, getContext, put, take, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  REQUEST,
  requestSuccess,
  requestFailure,
} from './ducks';

export default function* () {
  const watchRequest = yield takeLatest(REQUEST, requestSaga);

  yield fork(requestSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watchRequest);
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
