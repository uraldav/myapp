import {
  call,
  cancel,
  getContext,
  put,
  take,
  fork,
  takeLatest,
} from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  THEMATICS_REQUEST,
  thematicsRequestSuccess,
  thematicsRequestFailure,
} from './ducks';

export default function* () {
  const watchThematicsRequest = yield takeLatest(
    THEMATICS_REQUEST,
    thematicsRequestSaga,
  );

  yield fork(thematicsRequestSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watchThematicsRequest);
}

export function* thematicsRequestSaga() {
  const api = yield getContext('api');
  const { response, error } = yield call(
    api.investigationsThematics.fetchThematics,
  );

  if (response) {
    yield put(thematicsRequestSuccess(response));
  } else {
    yield put(thematicsRequestFailure(error));
  }
}
