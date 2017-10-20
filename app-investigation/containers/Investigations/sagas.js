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
  SELECT_INVESTIGATION,
  investigationsRequest,
  investigationsRequestSuccess,
  investigationsRequestFailure,
} from './ducks';

import { menuCollapse } from '../App/ducks';

export default function* () {
  const watchInvestigationsRequest = yield takeLatest(
    INVESTIGATIONS_REQUEST,
    investigationsRequestSaga,
  );
  const watchSelectInvestigation = yield takeLatest(
    SELECT_INVESTIGATION,
    selectInvestigationSaga,
  );

  yield fork(investigationsRequestSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watchInvestigationsRequest, watchSelectInvestigation);
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

export function* selectInvestigationSaga() {
  yield put(menuCollapse());
}
