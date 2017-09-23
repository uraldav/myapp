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
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { loginSelector, passwordSelector } from './selectors';
import { REQUEST, success, failure } from './ducks';

export default function* () {
  const watchRequest = yield takeLatest(REQUEST, requestSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watchRequest);
}

export function* requestSaga() {
  const api = yield getContext('api');
  const cookie = yield getContext('cookie');
  const login = yield select(loginSelector);
  const password = yield select(passwordSelector);

  const { token, userData, error } = yield call(
    api.auth.authorize,
    login,
    password,
  );

  if (userData) {
    cookie.set('Authorization', token);
    yield put(success(userData));
    yield put(push('/'));
  } else {
    yield put(failure(error));
  }
}

