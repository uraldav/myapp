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
  INVESTIGATIONS_REQUEST,
  investigationsRequest,
  investigationsRequestSuccess,
  investigationsRequestFailure,
} from './ducks';

export default function* () {
  const watchInvestigationsRequest = yield takeLatest(
    INVESTIGATIONS_REQUEST,
    investigationsRequestSaga,
  );

  yield fork(investigationsRequestSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watchInvestigationsRequest);
}

export function* investigationsRequestSaga() {
  const api = yield getContext('api');
  const { response, error } = yield call(
    api.investigations.fetchInvestigations,
  );

  if (response) {
    yield put(investigationsRequestSuccess(response));
  } else {
    yield put(investigationsRequestFailure(error));
  }
}
