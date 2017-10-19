import {
  call,
  cancel,
  fork,
  getContext,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';
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
  const { response, error } = yield call(api.reasons.fetchReasons);

  if (response) {
    yield put(requestSuccess(response));
  } else {
    yield put(requestFailure(error));
  }
}
