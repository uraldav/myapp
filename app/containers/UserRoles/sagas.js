import {
  call,
  cancel,
  getContext,
  put,
  take,
  takeLatest,
  select,
} from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { dataSelector } from './selectors';
import {
  REQUEST,
  requestSuccess,
  requestFailure,
  requestPermissionsSuccess,
  requestPermissionsFailure,
  changeEditableRecord,
} from './ducks';

export default function* () {
  const watchRequest = yield takeLatest(REQUEST, requestUserRolesSaga);

  yield call(requestPermissionsSaga);
  yield call(requestUserRolesSaga);

  const data = yield select(dataSelector);
  yield put(changeEditableRecord(data[0]));

  yield take(LOCATION_CHANGE);
  yield cancel(watchRequest);
}

export function* requestUserRolesSaga() {
  const api = yield getContext('api');

  try {
    const response = yield call(api.userRoles.fetchUserRoles);
    yield put(requestSuccess(response));
  } catch (error) {
    yield put(requestFailure(error));
  }
}

export function* requestPermissionsSaga() {
  const api = yield getContext('api');

  try {
    const response = yield call(api.userRoles.fetchPermissions);
    yield put(requestPermissionsSuccess(response));
  } catch (error) {
    yield put(requestPermissionsFailure(error));
  }
}
