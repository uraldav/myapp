import {
  call,
  fork,
  getContext,
  put,
  take,
  takeLatest,
  select,
  cancel,
} from 'redux-saga/effects';
import { fromJS } from 'immutable';
import queryString from 'query-string';
import { LOCATION_CHANGE } from 'react-router-redux';
import { locationSelector } from 'app-common/store/globalSelectors';
import { REQUEST, success, failure } from './ducks';

export default function* () {
  const requestWatcher = yield takeLatest(REQUEST, requestSaga);

  yield fork(requestSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(requestWatcher);
}

export function* requestSaga() {
  const api = yield getContext('api');
  const location = yield select(locationSelector);
  const queryParams = queryString.parse(location.search);

  try {
    const response = yield call(api.mentions.fetchMentions, queryParams);
    yield put(success(fromJS(response)));
  } catch (error) {
    yield put(failure(error));
  }
}
