import {
  call,
  cancel,
  getContext,
  put,
  take,
  takeLatest,
  select,
  fork,
} from 'redux-saga/effects';
import { notification } from 'antd';
import { LOCATION_CHANGE } from 'react-router-redux';
import queryString from 'query-string';
import { uniq, append } from 'ramda';
import { locationSelector } from 'app-common/store/globalSelectors';
import {
  changeExpandedMenuItems,
  changeSelectedMenuItem,
  userDataSuccess,
  userDataFailure,
} from './ducks';
import { expandedMenuItemsSelector } from './selectors';

export default function* () {
  const cookie = yield getContext('cookie');

  if (cookie.get('Authorization')) {
    yield fork(requestUserData);
  }

  const watchGlobalFailure = yield takeLatest(
    action => /_FAILURE/.test(action.type),
    failure,
  );

  const watchChangeLocation = yield takeLatest(
    LOCATION_CHANGE,
    changeLocationSaga,
  );

  yield fork(changeLocationSaga);

  yield take(
    action =>
      action.type === LOCATION_CHANGE && action.payload.pathname === '/auth',
  );
  yield cancel(watchGlobalFailure, watchChangeLocation);
}

export function* changeLocationSaga() {
  const location = yield select(locationSelector);
  const expandedMenuItems = yield select(expandedMenuItemsSelector);

  if (location.pathname === '/') {
    yield put(
      changeSelectedMenuItem({
        item: 'investigations',
      }),
    );
  } else if (location.pathname === '/mass_measures') {
    yield put(
      changeSelectedMenuItem({
        item: 'mass_measures',
      }),
    );
  } else {
    yield put(
      changeExpandedMenuItems(uniq(append('settings', expandedMenuItems))),
    );
    yield put(
      changeSelectedMenuItem({
        item: location.pathname.replace('/', ''),
        parent: 'settings',
      }),
    );
  }
}

export function* failure({ payload }) {
  yield call(notification.error, {
    message: payload.message,
    duration: 0,
    description: process.env.NODE_ENV === 'production' ? '' : payload.stack,
    style: {
      width: process.env.NODE_ENV === 'production' ? 335 : 800,
      marginLeft: process.env.NODE_ENV === 'production' ? 0 : 335 - 800,
    },
  });
}

export function* requestUserData() {
  const api = yield getContext('api');
  const cookie = yield getContext('cookie');

  const { response, error } = yield call(
    api.auth.fetchUserData,
    cookie.get('Authorization'),
  );

  if (response) {
    yield put(userDataSuccess(response));
  } else {
    yield put(userDataFailure(error));
  }
}
