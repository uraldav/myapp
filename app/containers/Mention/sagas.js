import {
  call,
  fork,
  getContext,
  put,
  takeLatest,
  select,
} from 'redux-saga/effects';
import { fromJS } from 'immutable';
import queryString from 'query-string';
import { REQUEST, success, failure } from './ducks';
import { locationSelector } from '../../store/globalSelectors';

export default function* () {
  yield takeLatest(REQUEST, requestSaga);

  yield fork(requestSaga);
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
