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

  const { response, error } = yield call(api.auth.authorize, login, password);

  if (response) {
    if (process.env.NODE_ENV === 'production') {
      cookie.set('Authorization', response.token);
      yield put(success(response.userData));
    } else {
      const { response: devres, error: dever } = yield call(
        api.auth.fetchUserData,
        'sqsq',
      );
      cookie.set('Authorization', 'sqsq');
      yield put(success(devres.userData));
    }
    yield put(push('/'));
  } else {
    switch (error.response.status) {
      case 401:
        yield put(failure('Неверный логин или пароль'));
        break;
      default:
        yield put(failure(error));
    }
  }
}
