import {
  getContext,
  call,
  takeLatest,
  put,
  fork,
  take,
  cancel,
} from 'redux-saga/effects';

import { LOCATION_CHANGE } from 'react-router-redux';

import { requestSuccess, requestFailure, REQUEST, request } from './ducks';

export default function* () {
  const watchRequest = yield takeLatest(REQUEST, requestSaga);
  yield fork(requestSaga);
  yield take(LOCATION_CHANGE);
  yield cancel(watchRequest);
}

export function* requestSaga() {
  const api = yield getContext('api');

  const { response, error } = yield call(api.importantAuthors.fetchAuthors);

  if (response) {
    yield put(requestSuccess(response));
    yield put(request());
  } else {
    yield put(requestFailure(error));
  }
}
