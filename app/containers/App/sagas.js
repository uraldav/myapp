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
import {
  MENU_ITEMS_REQUEST,
  menuItemsSuccess,
  menuItemsFailure,
  changeExpandedMenuItems,
  changeSelectedMenuItem,
  userDataSuccess,
  userDataFailure,
} from './ducks';
import { expandedMenuItemsSelector } from './selectors';
import { locationSelector } from '../../store/globalSelectors';

export default function* () {
  const watchMenuItemsRequest = yield takeLatest(
    MENU_ITEMS_REQUEST,
    menuItemsRequestSaga,
  );

  const cookie = yield getContext('cookie');

  if (cookie.get('Authorization')) {
    yield fork(requestUserData);
  }

  yield takeLatest(action => /_FAILURE/.test(action.type), failure);

  const location = yield select(locationSelector);
  const expandedMenuItems = yield select(expandedMenuItemsSelector);

  const queryParams = queryString.parse(location.search);

  if (location.pathname === '/') {
    if (queryParams.socialId) {
      yield put(
        changeExpandedMenuItems(
          uniq(append(queryParams.socialId, expandedMenuItems)),
        ),
      );
      yield put(changeSelectedMenuItem({ item: queryParams.socialId }));
      if (queryParams.socialWord) {
        yield put(
          changeSelectedMenuItem({
            item: queryParams.socialWord,
            parent: queryParams.socialId,
          }),
        );
      }
    }
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

  yield take(LOCATION_CHANGE);
  yield cancel(watchMenuItemsRequest);
}

export function* menuItemsRequestSaga() {
  const api = yield getContext('api');
  const { response, error } = yield call(api.mentionsWords.fetchMentionsWords);
  if (response) {
    yield put(menuItemsSuccess(response));
  } else {
    yield put(menuItemsFailure(error));
  }
}

export function* failure({ payload }) {
  notification.error({
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
