import { put, call, takeLatest, getContext } from 'redux-saga/effects';
import {
  JOBS_REQUEST,
  jobRequest,
  jobRequestSuccess,
  jobRequestFailure,
} from './ducks';

export default function* () {
  yield takeLatest(JOBS_REQUEST, requestSaga);

  yield put(jobRequest());
}

function* requestSaga() {
  const api = yield getContext('api');

  const { response, error } = yield call(api.jobList.fetchList);

  if (response) {
    yield put(jobRequestSuccess(response));
  } else {
    yield put(jobRequestFailure(error));
  }
}
